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
exports.createVSCodeSettings = exports.createENVPy = exports.createHTML = exports.createProcfile = exports.createGitIgnore = exports.createMarkdown = void 0;
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var generateHTML_1 = require("../generate/generateHTML");
var generateSettings_1 = require("../generate/generateSettings");
var generateENV_1 = require("../generate/generateENV");
var generateMarkdown_1 = require("../generate/generateMarkdown");
var write = util_1.promisify(fs_1.default.writeFile);
var append = util_1.promisify(fs_1.default.appendFile);
/**
 * Generates README and Markdown files
 * @param {Object} options
 */
function createMarkdown(options) {
    return __awaiter(this, void 0, void 0, function () {
        var readmeFile, testFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateMarkdown_1.generateREADME(options)];
                case 1:
                    readmeFile = _a.sent();
                    return [4 /*yield*/, generateMarkdown_1.generateTESTING(options)];
                case 2:
                    testFile = _a.sent();
                    return [4 /*yield*/, write(options.targetDirectory + '/README.md', readmeFile)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, write(options.targetDirectory + '/TESTING.md', testFile)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createMarkdown = createMarkdown;
/**
 * Generates a custom .gitignore file depending on project
 * @param {Object} options
 */
function createGitIgnore(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!options.envName)
                return [2 /*return*/];
            append(options.targetDirectory + '/.gitignore', "\n" + options.envName + "/");
            return [2 /*return*/];
        });
    });
}
exports.createGitIgnore = createGitIgnore;
/**
 * Generates a custom Procfile depending on project
 * @param {Object} options
 */
function createProcfile(options) {
    return __awaiter(this, void 0, void 0, function () {
        var content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, options.template.flask];
                case 1:
                    content = (_a.sent()) ? "web: python app.py" : "web: gunicorn " + options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase() + ".wsgi:application";
                    return [4 /*yield*/, append(options.targetDirectory + '/Procfile', content)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProcfile = createProcfile;
/**
 * Generates HTML for projects
 * @param {Object} options
 */
function createHTML(options) {
    return __awaiter(this, void 0, void 0, function () {
        var html, indexFileLocation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateHTML_1.generateHTML(options)];
                case 1:
                    html = _a.sent();
                    if (options.template.flask || options.template.django)
                        return [2 /*return*/];
                    indexFileLocation = '/index.html';
                    return [4 /*yield*/, write(options.targetDirectory + indexFileLocation, html)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createHTML = createHTML;
/**
 * Generates env.py used for python projects
 * @param {Object} options
 */
function createENVPy(options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = write;
                    _b = [options.targetDirectory + '/env.py'];
                    return [4 /*yield*/, generateENV_1.generateENVFile(options)];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createENVPy = createENVPy;
/**
 *  Generates vscode settings per project.
 * @param {Object} options
 */
function createVSCodeSettings(options) {
    return __awaiter(this, void 0, void 0, function () {
        var path, settings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = '/.vscode/settings.json';
                    return [4 /*yield*/, generateSettings_1.generatePythonSettings(options)];
                case 1:
                    settings = _a.sent();
                    if (options.gitpod) {
                        throw new Error('Gitpod is so far not supported');
                    }
                    return [4 /*yield*/, write(options.targetDirectory + path, settings)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createVSCodeSettings = createVSCodeSettings;
