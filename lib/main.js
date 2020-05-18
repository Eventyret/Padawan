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
exports.createProject = void 0;
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const common_1 = require("./common/common");
const listr_1 = __importDefault(require("listr"));
const generateRequirements_1 = require("./generate/generateRequirements");
const createFiles_1 = require("./tasks/createFiles");
const createStructure_1 = require("./tasks/createStructure");
const git_1 = require("./tasks/git");
const virtualenv_1 = require("./tasks/virtualenv");
const access = util_1.promisify(fs_1.default.access);
let errorToggle = false;
/**
 * Main function to create a project
 * @param {Object} options
 */
function createProject(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = Object.assign(Object.assign({}, options), { targetDirectory: options.targetDirectory || process.cwd() });
        const templateDir = path_1.default.resolve(__dirname, '../templates', options.template.name.toLowerCase());
        const commonDir = path_1.default.resolve(__dirname, '../templates/common');
        const backendDir = path_1.default.resolve(__dirname, '../templates/backend');
        const frontendDir = path_1.default.resolve(__dirname, '../templates/frontend');
        options.templateDirectory = templateDir;
        options.commonDir = commonDir;
        options.backendDir = backendDir;
        options.frontendDir = frontendDir;
        try {
            yield access(templateDir, fs_1.default.constants.R_OK);
            yield access(commonDir, fs_1.default.constants.R_OK);
            yield access(backendDir, fs_1.default.constants.R_OK);
            yield access(frontendDir, fs_1.default.constants.R_OK);
        }
        catch (err) {
            console.error('%s Invalid template name', chalk_1.default.red.bold('ERROR'));
            process.exit(1);
        }
        const vsCodeTasks = new listr_1.default([
            {
                title: `Creating ${options.name} Project`,
                task: (ctx, task) => {
                    createStructure_1.createProjectDir(options).catch((err) => {
                        if (err.code === 'EEXIST') {
                            options.error = true;
                            task.skip('Folder Already exists');
                            ctx.exists = true;
                        }
                        else {
                            ctx.exists = false;
                        }
                    });
                },
                skip: () => options.gitpod,
            },
            {
                title: `Copying Common files to ${options.name}`,
                skip: (ctx) => ctx.exists,
                task: () => createStructure_1.copyFiles(options, 'common'),
                enabled: () => !options.error,
            },
            {
                title: `Creating Project files for ${options.name}`,
                skip: (ctx) => ctx.exists,
                task: () => 
                //prettier-ignore
                options.template.python ? createStructure_1.copyFiles(options, "backend") : createStructure_1.copyFiles(options, "frontend"),
                enabled: () => !options.error,
            },
            {
                title: `Copying Python settings ${options.name}`,
                task: () => createStructure_1.copyFiles(options, 'backend'),
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
                enabled: () => options.template.python && !options.error,
            },
            {
                title: `Copying template files to ${options.name}`,
                task: () => createStructure_1.copyFiles(options, 'templates'),
                enabled: () => !options.error,
                skip: (ctx) => ctx.exists,
            },
            {
                title: 'Making Starting Templates',
                task: () => createFiles_1.createHTML(options),
                enabled: () => !options.error,
                skip: (ctx) => ctx.exists,
            },
            {
                title: 'Creating README and TESTING.md 📢📑',
                task: () => createFiles_1.createMarkdown(options),
                enabled: () => !options.error,
                skip: (ctx) => ctx.exists,
            },
            {
                title: 'Generating requirements.txt file',
                task: () => generateRequirements_1.generateRequirements(options),
                skip: () => 
                // prettier-ignore
                options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
                enabled: () => !options.error,
            },
            {
                title: 'Generating python env file',
                task: () => createFiles_1.createENVPy(options),
                skip: () => 
                // prettier-ignore
                options.gitpod || !options.template.flask ? 'Not a Flask Project 🚫🐍' : false,
                enabled: () => options.template.flask && !options.error,
            },
            {
                title: 'Generating vscode settings',
                task: (task) => createFiles_1.createVSCodeSettings(options).catch((err) => {
                    task.skip(err.message);
                }),
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false,
                enabled: () => !options.error,
            },
            {
                title: 'Configuring Procfile',
                task: () => createFiles_1.createProcfile(options),
                enabled: () => (options.template.flask || options.template.django) && !options.error,
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || options.gitpod,
            },
            {
                title: 'Setting up git',
                task: () => git_1.gitTasks(options),
                enabled: () => options.git && !options.error,
                skip: (ctx) => ctx.exists,
            },
            {
                title: 'Setting up Virtual Enviroment',
                task: () => virtualenv_1.installVirtualEnv(options),
                enabled: () => options.createENV && !options.error,
                skip: (ctx) => ctx.exists,
            },
            {
                title: 'Setting Flask up',
                task: () => virtualenv_1.flaskApp(),
                enabled: () => options.template.flask && options.env && !options.error,
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || !options.template.flask ? 'Not a Flask Project' : undefined || options.gitpod,
            },
            {
                title: 'Setting Django up',
                task: () => virtualenv_1.djangoApp(),
                enabled: () => options.template.django && options.env && !options.error,
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || !options.template.django ? 'Not a Django Project' : undefined || options.gitpod,
            },
            {
                title: 'Configuring .gitignore',
                task: () => createFiles_1.createGitIgnore(options),
                skip: (ctx) => 
                // prettier-ignore
                ctx.exists || !options.env ? 'No VirtualEnviroment created' : false || options.gitpod,
                enabled: () => !options.error,
            },
        ]);
        if (!options.gitpod) {
            yield vsCodeTasks.run().catch(() => (errorToggle = true));
            if (!errorToggle && !options.error) {
                common_1.title(`${options.name}`, 'ANSI Shadow');
                console.log('This tool was created by Eventyret');
                console.log(`If you liked this tool please do say thank you in Slack or mention the tool in your Readme`);
                return true;
            }
            if (options.error) {
                clear_1.default();
                common_1.title('Error', 'ANSI Shadow');
                console.log(`${options.name} folder already exists`);
                return false;
            }
        }
        else {
            common_1.title('Oh noes!', 'ANSI Shadow');
            console.log('Gitpod is not supported yet');
            return false;
        }
    });
}
exports.createProject = createProject;
//# sourceMappingURL=main.js.map