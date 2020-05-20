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
Object.defineProperty(exports, "__esModule", { value: true });
exports.djangoApp = exports.flaskApp = exports.installVirtualEnv = void 0;
var async_shelljs_1 = require("async-shelljs");
var common_1 = require("../common/common");
var target = {};
var targetDir;
/**
 * Using virtualenv to freeze and install correct pip packages
 * @param {Object} options
 */
function pipInstallAndFreeze(options) {
    return __awaiter(this, void 0, void 0, function () {
        var devNul, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, getDevNul()];
                case 1:
                    devNul = _a.sent();
                    return [4 /*yield*/, async_shelljs_1.asyncExec("virtualenv " + targetDir + target.osVar)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, async_shelljs_1.asyncExec("" + targetDir + target.pip + " install -r " + options.backendDir + target.requirements + " > " + devNul)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, async_shelljs_1.asyncExec("" + targetDir + target.pip + " freeze --local >> " + options.backendDir + target.requirements + " > " + devNul)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    throw err_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// TODO: Check if python3 is installed
/**
 * Installing and using virtualenv
 * @param {Object} options
 */
function installVirtualEnv(options) {
    return __awaiter(this, void 0, void 0, function () {
        var usrOS, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDir = options.targetDirectory;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, common_1.getOS()];
                case 2:
                    usrOS = _a.sent();
                    return [4 /*yield*/, targetOS(options, usrOS)];
                case 3:
                    _a.sent();
                    if (!(!options.gitpod && usrOS === 'windows')) return [3 /*break*/, 6];
                    return [4 /*yield*/, async_shelljs_1.asyncExec('pip install virtualenv')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, pipInstallAndFreeze(options)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, async_shelljs_1.asyncExec('pip3 install virtualenv > /dev/null 2>&1')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, pipInstallAndFreeze(options)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    options.env = true;
                    return [3 /*break*/, 11];
                case 10:
                    err_2 = _a.sent();
                    throw err_2;
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.installVirtualEnv = installVirtualEnv;
/**
 * Install Flask into the virtual environment
 */
function flaskApp() {
    return __awaiter(this, void 0, void 0, function () {
        var devNul;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDevNul()];
                case 1:
                    devNul = _a.sent();
                    return [4 /*yield*/, async_shelljs_1.asyncExec("" + targetDir + target.pip + " install Flask > " + devNul)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.flaskApp = flaskApp;
/**
 * Installs Django into the virtual environment
 */
function djangoApp() {
    return __awaiter(this, void 0, void 0, function () {
        var devNul;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDevNul()];
                case 1:
                    devNul = _a.sent();
                    return [4 /*yield*/, async_shelljs_1.asyncExec("" + targetDir + target.pip + " install Django > " + devNul)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.djangoApp = djangoApp;
/**
 * Checks if we want to use dev/null or Nul
 * @returns {Promise<String>} Nul or dev/null
 */
function getDevNul() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, common_1.getOS()];
                case 1: return [2 /*return*/, (_a.sent()) === 'windows' ? 'NUL' : '/dev/null 2>&1'];
            }
        });
    });
}
/**
 * Sets up the correct targets for use depending on OS
 * @param {Object} options
 * @param {String} platform
 */
function targetOS(options, platform) {
    return __awaiter(this, void 0, void 0, function () {
        var envName;
        return __generator(this, function (_a) {
            envName = !options.envName ? 'env' : options.envName;
            if (platform === 'windows') {
                // prettier-ignore
                target.path = "\\\\" + envName + "\\Scripts\\activate";
                target.osVar = "\\\\" + envName;
                target.pythonExecutable = "\\\\" + envName + "\\Scripts\\python.exe";
                target.pip = "\\\\" + envName + "\\Scripts\\pip.exe";
                target.requirements = '\\requirements.txt';
            }
            else {
                target.path = "/" + envName + "/bin/activate";
                target.osVar = "/" + envName;
                target.pythonExecutable = "/" + envName + "/bin/python3";
                target.pip = "/" + envName + "/bin/pip3";
                target.requirements = '/requirements.txt';
            }
            return [2 /*return*/];
        });
    });
}
