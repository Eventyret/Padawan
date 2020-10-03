"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
var arg_1 = __importDefault(require("arg"));
var inquirer_1 = __importDefault(require("inquirer"));
var clear_1 = __importDefault(require("clear"));
var common_1 = require("./common/common");
var main_1 = require("./main");
/**
 *  Input taken directly from the user
 * @param {String[]} rawArgs
 */
function parseArgumentsIntoOptions(rawArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            args = arg_1.default({
                '--name': String,
                '--git': Boolean,
                '--gitpod': Boolean,
                '-n': '--name',
                '-g': '--git',
                '-p': '--gitpod',
            }, {
                argv: rawArgs.slice(2),
            });
            return [2 /*return*/, {
                    name: args['--name'],
                    git: args['--git'] || false,
                    template: args._[0],
                    gitpod: args['--gitpod'] || false,
                }];
        });
    });
}
/**
 *
 * @param {UserOptions} options
 */
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultTemplate, questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultTemplate = 'UCFD';
                    questions = [];
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
                    // @ts-ignore
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
                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { template: options.template || answers.template, git: options.git || answers.git, name: answers.name, env: answers.env || false, envName: answers.envName || 'env', gitpod: answers.gitpod })];
            }
        });
    });
}
/**
 * Checking if the user has created a virtual enviroment before
 * @param {UserOptions} options
 */
function doesEnvExistForProject(options) {
    return __awaiter(this, void 0, void 0, function () {
        var questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [];
                    if (options.template.python && !options.gitpod) {
                        questions.push({
                            type: 'confirm',
                            name: 'env',
                            message: 'Have you created a virtual enviroment for your project',
                            default: false,
                        });
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { env: answers.env })];
            }
        });
    });
}
/**
 *  Questions if the user wants us to create a virtual enviroment
 * or if the user has one already what is the name of the folder.
 * @param {UserOptions} options
 */
function envQuestions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [];
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
                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { envName: answers.envName, createENV: answers.createENV })];
            }
        });
    });
}
/**
 * Starting the main program
 * @param {any} args
 */
function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clear_1.default();
                    common_1.title({ text: 'Padawan', font: 'ANSI Shadow' });
                    options = parseArgumentsIntoOptions(args);
                    return [4 /*yield*/, promptForMissingOptions(options)];
                case 1:
                    options = _a.sent();
                    return [4 /*yield*/, doesEnvExistForProject(options)];
                case 2:
                    options = _a.sent();
                    return [4 /*yield*/, envQuestions(options)];
                case 3:
                    options = _a.sent();
                    return [4 /*yield*/, main_1.createProject(options)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cli = cli;
