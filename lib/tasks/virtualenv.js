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
Object.defineProperty(exports, "__esModule", { value: true });
exports.djangoApp = exports.flaskApp = exports.installVirtualEnv = void 0;
const async_shelljs_1 = require("async-shelljs");
const common_1 = require("../common/common");
const target = {};
let targetDir;
/**
 * Using virtualenv to freeze and install correct pip packages
 * @param {Object} options
 */
function pipInstallAndFreeze(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const devNul = yield getDevNul();
            yield async_shelljs_1.asyncExec(`virtualenv ${targetDir}${target.osVar}`);
            yield async_shelljs_1.asyncExec(`${targetDir}${target.pip} install -r ${options.backendDir}${target.requirements} > ${devNul}`);
            yield async_shelljs_1.asyncExec(`${targetDir}${target.pip} freeze --local >> ${options.backendDir}${target.requirements} > ${devNul}`);
        }
        catch (err) {
            throw err;
        }
    });
}
// TODO: Check if python3 is installed
/**
 * Installing and using virtualenv
 * @param {Object} options
 */
function installVirtualEnv(options) {
    return __awaiter(this, void 0, void 0, function* () {
        targetDir = options.targetDirectory;
        try {
            const usrOS = yield common_1.getOS();
            yield targetOS(options, usrOS);
            if (!options.gitpod && usrOS === 'windows') {
                yield async_shelljs_1.asyncExec('pip install virtualenv');
                yield pipInstallAndFreeze(options);
            }
            else {
                yield async_shelljs_1.asyncExec('pip3 install virtualenv > /dev/null 2>&1');
                yield pipInstallAndFreeze(options);
            }
            options.env = true;
        }
        catch (err) {
        }
    });
}
exports.installVirtualEnv = installVirtualEnv;
/**
 * Install Flask into the virtual environment
 */
function flaskApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const devNul = yield getDevNul();
        yield async_shelljs_1.asyncExec(`${targetDir}${target.pip} install Flask > ${devNul}`);
        return;
    });
}
exports.flaskApp = flaskApp;
/**
 * Installs Django into the virtual environment
 */
function djangoApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const devNul = yield getDevNul();
        yield async_shelljs_1.asyncExec(`${targetDir}${target.pip} install Django > ${devNul}`);
        return;
    });
}
exports.djangoApp = djangoApp;
/**
 * Checks if we want to use dev/null or Nul
 * @returns {Promise<String>} Nul or dev/null
 */
function getDevNul() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield common_1.getOS()) === 'windows' ? 'NUL' : '/dev/null 2>&1';
    });
}
/**
 * Sets up the correct targets for use depending on OS
 * @param {Object} options
 * @param {String} platform
 */
function targetOS(options, platform) {
    return __awaiter(this, void 0, void 0, function* () {
        let envName = !options.envName ? 'env' : options.envName;
        if (platform == 'windows') {
            //prettier-ignore
            target.path = `\\\\${envName}\\Scripts\\activate`;
            target.osVar = `\\\\${envName}`;
            target.pythonExecutable = `\\\\${envName}\\Scripts\\python.exe`;
            target.pip = `\\\\${envName}\\Scripts\\pip.exe`;
            target.requirements = '\\requirements.txt';
        }
        else {
            target.path = `/${envName}/bin/activate`;
            target.osVar = `/${envName}`;
            target.pythonExecutable = `/${envName}/bin/python3`;
            target.pip = `/${envName}/bin/pip3`;
            target.requirements = '/requirements.txt';
        }
    });
}
//# sourceMappingURL=virtualenv.js.map