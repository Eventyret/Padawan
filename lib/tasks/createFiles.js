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
exports.createVSCodeSettings = exports.createENVPy = exports.createHTML = exports.createProcfile = exports.createGitIgnore = exports.createMarkdown = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const generateHTML_1 = require("../generate/generateHTML");
const generateSettings_1 = require("../generate/generateSettings");
const generateENV_1 = require("../generate/generateENV");
const generateMarkdown_1 = require("../generate/generateMarkdown");
const write = util_1.promisify(fs_1.default.writeFile);
const append = util_1.promisify(fs_1.default.appendFile);
/**
 * Generates README and Markdown files
 * @param {Object} options
 */
function createMarkdown(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const readmeFile = yield generateMarkdown_1.generateREADME(options);
        const testFile = yield generateMarkdown_1.generateTESTING(options);
        yield write(options.targetDirectory + '/README.md', readmeFile);
        yield write(options.targetDirectory + '/TESTING.md', testFile);
    });
}
exports.createMarkdown = createMarkdown;
/**
 * Generates a custom .gitignore file depending on project
 * @param {Object} options
 */
function createGitIgnore(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.envName)
            return;
        append(options.targetDirectory + '/.gitignore', `\n${options.envName}/`);
    });
}
exports.createGitIgnore = createGitIgnore;
/**
 * Generates a custom Procfile depending on project
 * @param {Object} options
 */
function createProcfile(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = (yield options.template.flask) ? `web: python app.py` : `web: gunicorn ${options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase()}.wsgi:application`;
        yield append(options.targetDirectory + '/Procfile', content);
    });
}
exports.createProcfile = createProcfile;
/**
 * Generates HTML for projects
 * @param {Object} options
 */
function createHTML(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const html = yield generateHTML_1.generateHTML(options);
        if (options.template.flask || options.template.django)
            return;
        let indexFileLocation = '/index.html';
        yield write(options.targetDirectory + indexFileLocation, html);
    });
}
exports.createHTML = createHTML;
/**
 * Generates env.py used for python projects
 * @param {Object} options
 */
function createENVPy(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield write(options.targetDirectory + '/env.py', yield generateENV_1.generateENVFile(options));
    });
}
exports.createENVPy = createENVPy;
/**
 *  Generates vscode settings per project.
 * @param {Object} options
 */
function createVSCodeSettings(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let path = '/.vscode/settings.json';
        const settings = yield generateSettings_1.generatePythonSettings(options);
        if (options.gitpod) {
            throw new Error('Gitpod is so far not supported');
        }
        yield write(options.targetDirectory + path, settings);
    });
}
exports.createVSCodeSettings = createVSCodeSettings;
//# sourceMappingURL=createFiles.js.map