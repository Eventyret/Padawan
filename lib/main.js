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
exports.createProject = void 0;
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("util");
var common_1 = require("./common/common");
var listr_1 = __importDefault(require("listr"));
var generateRequirements_1 = require("./generate/generateRequirements");
var createFiles_1 = require("./tasks/createFiles");
var createStructure_1 = require("./tasks/createStructure");
var git_1 = require("./tasks/git");
var virtualenv_1 = require("./tasks/virtualenv");
var access = util_1.promisify(fs_1.default.access);
var errorToggle = false;
/**
 * Main function to create a project
 * @param {UserOptions} options
 */
function createProject(options) {
    return __awaiter(this, void 0, void 0, function () {
        var templateDir, commonDir, backendDir, frontendDir, err_1, vsCodeTasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = __assign(__assign({}, options), { targetDirectory: options.targetDirectory || process.cwd() });
                    templateDir = path_1.default.resolve(__dirname, '../templates', options.template.name.toLowerCase());
                    commonDir = path_1.default.resolve(__dirname, '../templates/common');
                    backendDir = path_1.default.resolve(__dirname, '../templates/backend');
                    frontendDir = path_1.default.resolve(__dirname, '../templates/frontend');
                    options.templateDirectory = templateDir;
                    options.commonDir = commonDir;
                    options.backendDir = backendDir;
                    options.frontendDir = frontendDir;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, access(templateDir, fs_1.default.constants.R_OK)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, access(commonDir, fs_1.default.constants.R_OK)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, access(backendDir, fs_1.default.constants.R_OK)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, access(frontendDir, fs_1.default.constants.R_OK)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error('%s Invalid template name', chalk_1.default.red.bold('ERROR'));
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7:
                    vsCodeTasks = new listr_1.default([
                        {
                            title: "Creating " + options.name + " Project",
                            task: function (ctx, task) {
                                createStructure_1.createProjectDir(options).catch(function (err) {
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
                            skip: function () { return options.gitpod; },
                        },
                        {
                            title: "Copying Common files to " + options.name,
                            skip: function (ctx) { return ctx.exists; },
                            task: function () { return createStructure_1.copyFiles(options, 'common'); },
                            enabled: function () { return !options.error; },
                        },
                        {
                            title: "Creating Project files for " + options.name,
                            skip: function (ctx) { return ctx.exists; },
                            task: function () {
                                // prettier-ignore
                                return options.template.python ? createStructure_1.copyFiles(options, "backend") : createStructure_1.copyFiles(options, "frontend");
                            },
                            enabled: function () { return !options.error; },
                        },
                        {
                            title: "Copying Python settings " + options.name,
                            task: function () { return createStructure_1.copyFiles(options, 'backend'); },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || !options.template.python ? 'Not a Python Project 🚫🐍' : false;
                            },
                            enabled: function () { return options.template.python && !options.error; },
                        },
                        {
                            title: "Copying template files to " + options.name,
                            task: function () { return createStructure_1.copyFiles(options, 'templates'); },
                            enabled: function () { return !options.error; },
                            skip: function (ctx) { return ctx.exists; },
                        },
                        {
                            title: 'Making Starting Templates',
                            task: function () { return createFiles_1.createHTML(options); },
                            enabled: function () { return !options.error; },
                            skip: function (ctx) { return ctx.exists; },
                        },
                        {
                            title: 'Creating README and TESTING.md 📢📑',
                            task: function () { return createFiles_1.createMarkdown(options); },
                            enabled: function () { return !options.error; },
                            skip: function (ctx) { return ctx.exists; },
                        },
                        {
                            title: 'Generating requirements.txt file',
                            task: function () { return generateRequirements_1.generateRequirements(options); },
                            skip: function () {
                                // prettier-ignore
                                return options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false;
                            },
                            enabled: function () { return !options.error; },
                        },
                        {
                            title: 'Generating python env file',
                            task: function () { return createFiles_1.createENVPy(options); },
                            skip: function () {
                                // prettier-ignore
                                return options.gitpod || !options.template.flask ? 'Not a Flask Project 🚫🐍' : false;
                            },
                            enabled: function () { return options.template.flask && !options.error; },
                        },
                        {
                            title: 'Generating vscode settings',
                            task: function (task) {
                                return createFiles_1.createVSCodeSettings(options).catch(function (err) {
                                    task.skip(err.message);
                                });
                            },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || options.gitpod || !options.template.python ? 'Not a Python Project 🚫🐍' : false;
                            },
                            enabled: function () { return !options.error; },
                        },
                        {
                            title: 'Configuring Procfile',
                            task: function () { return createFiles_1.createProcfile(options); },
                            enabled: function () { return (options.template.flask || options.template.django) && !options.error; },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || options.gitpod;
                            },
                        },
                        {
                            title: 'Setting up git',
                            task: function () { return git_1.gitTasks(options); },
                            enabled: function () { return options.git && !options.error; },
                            skip: function (ctx) { return ctx.exists; },
                        },
                        {
                            title: 'Setting up Virtual Enviroment',
                            task: function () { return virtualenv_1.installVirtualEnv(options); },
                            enabled: function () { return options.createENV && !options.error; },
                            skip: function (ctx) { return ctx.exists; },
                        },
                        {
                            title: 'Setting Flask up',
                            task: function () { return virtualenv_1.flaskApp(); },
                            enabled: function () { return options.template.flask && options.env && !options.error; },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || !options.template.flask ? 'Not a Flask Project' : undefined || options.gitpod;
                            },
                        },
                        {
                            title: 'Setting Django up',
                            task: function () { return virtualenv_1.djangoApp(); },
                            enabled: function () { return options.template.django && options.env && !options.error; },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || !options.template.django ? 'Not a Django Project' : undefined || options.gitpod;
                            },
                        },
                        {
                            title: 'Configuring .gitignore',
                            task: function () { return createFiles_1.createGitIgnore(options); },
                            skip: function (ctx) {
                                // prettier-ignore
                                return ctx.exists || !options.env ? 'No VirtualEnviroment created' : false || options.gitpod;
                            },
                            enabled: function () { return !options.error; },
                        },
                    ]);
                    if (!!options.gitpod) return [3 /*break*/, 9];
                    return [4 /*yield*/, vsCodeTasks.run().catch(function () { return (errorToggle = true); })];
                case 8:
                    _a.sent();
                    if (!errorToggle && !options.error) {
                        common_1.title({ text: "" + options.name, font: 'ANSI Shadow' });
                        console.log('This tool was created by Eventyret');
                        console.log("If you liked this tool please do say thank you in Slack or mention the tool in your Readme");
                        return [2 /*return*/, true];
                    }
                    if (options.error) {
                        clear_1.default();
                        common_1.title({ text: 'Error', font: 'ANSI Shadow' });
                        console.log(options.name + " folder already exists");
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 10];
                case 9:
                    common_1.title({ text: 'Oh noes!', font: 'ANSI Shadow' });
                    console.log('Gitpod is not supported yet');
                    return [2 /*return*/, false];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
