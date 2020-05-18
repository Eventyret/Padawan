"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const arg_1 = __importDefault(require("arg"));
const inquirer_1 = __importDefault(require("inquirer"));
const clear_1 = __importDefault(require("clear"));
const common_1 = require("./common/common");
const main_1 = require("./main");
/**
 *  Input taken directly from the user
 * @param {String[]} rawArgs
 */
function parseArgumentsIntoOptions(rawArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const args = arg_1.default({
            '--name': String,
            '--skip': Boolean,
            '--git': Boolean,
            '--clean': Boolean,
            '--gitpod': Boolean,
            '-n': '--name',
            '-g': '--git',
            '-p': '--gitpod',
            '-s': '--skip',
            '-c': '--clean',
        }, {
            argv: rawArgs.slice(2),
        });
        return {
            name: args['--name'],
            skipPrompts: args['--skip'] || false,
            git: args['--git'] || false,
            template: args._[0],
            clean: args['--clean'] || false,
            gitpod: args['--gitpod'] || false,
        };
    });
}
/**
 *
 * @param {Object} options
 */
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultTemplate = 'UCFD';
        if (options.skipPrompts) {
            return Object.assign(Object.assign({}, options), { template: options.template.name || defaultTemplate, clean: options.template || false });
        }
        const questions = [];
        if (!options.name) {
            questions.push({
                type: 'input',
                name: 'name',
                message: 'What is the name of this amazing project: ',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return 'Need to give your project a name';
                    }
                },
            });
        }
        if (!options.template) {
            questions.push({
                type: 'list',
                name: 'template',
                message: 'What milestone will you be working on?',
                choices: [
                    {
                        name: 'User Centric Frontend (MS1)',
                        value: { name: 'frontend', python: false, django: false, flask: false, js: false },
                    },
                    {
                        name: 'Interactive Frontend (MS2)',
                        value: { name: 'frontend', python: false, django: false, flask: false, js: true },
                    },
                    {
                        name: 'Data Centric Development (MS3)',
                        value: { name: 'DCD', python: true, django: false, flask: true, js: true },
                    },
                    {
                        name: 'Full Stack Frameworks (MS4)',
                        value: { name: 'FSF', python: true, django: true, flask: false, js: true },
                    },
                ],
                default: defaultTemplate,
            });
        }
        if (!questions.gitpod) {
            questions.push({
                type: 'confirm',
                name: 'gitpod',
                message: 'Are you using Gitpod?',
                default: false,
            });
        }
        if (!options.git) {
            questions.push({
                type: 'confirm',
                name: 'git',
                message: 'Initialize a git repository?',
                default: true,
            });
        }
        const answers = yield inquirer_1.default.prompt(questions);
        return Object.assign(Object.assign({}, options), { template: options.template || answers.template, git: options.git || answers.git, name: answers.name, env: answers.env || false, envName: answers.envName || 'env', gitpod: answers.gitpod });
    });
}
/**
 * Checking if the user has created a virtual enviroment before
 * @param {Object} options
 */
function doesEnvExistForProject(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = [];
        if (options.template.python && !options.gitpod) {
            questions.push({
                type: 'confirm',
                name: 'env',
                message: 'Have you created a virtual enviroment for your project',
                default: false,
            });
        }
        const answers = yield inquirer_1.default.prompt(questions);
        return Object.assign(Object.assign({}, options), { env: answers.env });
    });
}
/**
 *  Questions if the user wants us to create a virtual enviroment
 * or if the user has one already what is the name of the folder.
 * @param {Object} options
 */
function envQuestions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = [];
        if (!options.env && options.template.python && !options.gitpod) {
            questions.push({
                type: 'confirm',
                name: 'createENV',
                message: 'Do you want us to create one for you?',
                default: true,
            });
        }
        if (options.env && !options.gitpod) {
            questions.push({
                type: 'input',
                name: 'envName',
                message: 'What is the name of the folder for your virtual enviroment',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return 'We need to know your virtual enviroment folder name';
                    }
                },
            });
        }
        const answers = yield inquirer_1.default.prompt(questions);
        return Object.assign(Object.assign({}, options), { envName: answers.envName, createENV: answers.createENV });
    });
}
/**
 * Starting the main program
 * @param {String[]} args
 */
function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        clear_1.default();
        common_1.title('Padawan', 'ANSI Shadow');
        let options = parseArgumentsIntoOptions(args);
        options = yield promptForMissingOptions(options);
        options = yield doesEnvExistForProject(options);
        options = yield envQuestions(options);
        yield main_1.createProject(options);
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map