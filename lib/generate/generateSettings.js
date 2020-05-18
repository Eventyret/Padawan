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
exports.generatePythonSettings = void 0;
const common_1 = require("../common/common");
/**
 * Generates python specific vscode settings.
 * This includes a secret key and linting
 * @param {Object} config
 * @returns Customized vscode settings per OS.
 */
function generatePythonSettings(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const usrOS = yield common_1.getOS();
        // prettier-ignore
        const envPath = (config.env || config.createENV) ? yield generatePath(config, usrOS) : '';
        const settings = `{
  ${envPath}
  "python.terminal.activateEnvironment": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.linting.pylintArgs": ["--load-plugins=pylint_${config.template.django ? 'django' : 'flask'}"],
  "files.autoSave": "onFocusChange",
  "terminal.integrated.env.${usrOS}": {
    "SECRET_KEY": "${Math.random()
            .toString(36)
            .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)}",
      "DEV": "1",
      "HOSTNAME": "0.0.0.0",
      ${config.template.flask ? yield flaskSettings() : yield djangoSettings()}
    }
  }`;
        return settings;
    });
}
exports.generatePythonSettings = generatePythonSettings;
/**
 * Generates correct path for virtual enviroment
 * @param {Object} config
 * @param {String} os
 * @returns {Promise<String>} Customized OS path for virutal enviroment
 */
function generatePath(config, os) {
    return __awaiter(this, void 0, void 0, function* () {
        const envName = config.envName ? config.envName : 'env';
        if (os === 'osx' || os === 'linux')
            return `"python.pythonPath": "${envName}/bin/python3",`;
        if (os === 'windows')
            return `"python.pythonPath": "${envName}\\\\Scripts\\\\python.exe",`;
    });
}
/**
 * Flask specific settings
 * @returns {Promise<String>} Mongo URI Settings
 */
function flaskSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        return `"MONGO_URI": "YOUR MONGO URI GOES HERE"`;
    });
}
/**
 * Django specific settings
 * @returns {Pormise<String>} Stripe & AWS Settings
 */
function djangoSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        return `"STRIPE_PUBLISHABLE": "",
  "STRIPE_SECRET": "",
  "AWS_ACCESS_KEY_ID": "",
  "AWS_SECRET_ACCESS_KEY: "",
  "AWS_STORAGE_BUCKET_NAME": ""`;
    });
}
//# sourceMappingURL=generateSettings.js.map