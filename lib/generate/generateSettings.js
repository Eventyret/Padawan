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
exports.generatePythonSettings = void 0;
var common_1 = require("../common/common");
/**
 * Generates python specific vscode settings.
 * This includes a secret key and linting
 * @param {Object} config
 * @returns Customized vscode settings per OS.
 */
function generatePythonSettings(config) {
    return __awaiter(this, void 0, void 0, function () {
        var usrOS, envPath, _a, settings, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, common_1.getOS()];
                case 1:
                    usrOS = _d.sent();
                    if (!(config.env || config.createENV)) return [3 /*break*/, 3];
                    return [4 /*yield*/, generatePath(config, usrOS)];
                case 2:
                    _a = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = '';
                    _d.label = 4;
                case 4:
                    envPath = _a;
                    _b = "{\n  " + envPath + "\n  \"python.terminal.activateEnvironment\": true,\n  \"python.linting.enabled\": true,\n  \"python.linting.pylintEnabled\": true,\n  \"python.linting.pylintArgs\": [\"--load-plugins=pylint_" + (config.template.django ? 'django' : 'flask') + "\"],\n  \"files.autoSave\": \"onFocusChange\",\n  \"terminal.integrated.env." + usrOS + "\": {\n    \"SECRET_KEY\": \"" + (Math.random()
                        .toString(36)
                        .substring(2, 15) +
                        Math.random()
                            .toString(36)
                            .substring(2, 15)) + "\",\n      \"DEV\": \"1\",\n      \"HOSTNAME\": \"0.0.0.0\",\n      ";
                    if (!config.template.flask) return [3 /*break*/, 6];
                    return [4 /*yield*/, flaskSettings()];
                case 5:
                    _c = _d.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, djangoSettings()];
                case 7:
                    _c = _d.sent();
                    _d.label = 8;
                case 8:
                    settings = _b + (_c) + "\n    }\n  }";
                    return [2 /*return*/, settings];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var envName;
        return __generator(this, function (_a) {
            envName = config.envName ? config.envName : 'env';
            if (os === 'osx' || os === 'linux')
                return [2 /*return*/, "\"python.pythonPath\": \"" + envName + "/bin/python3\","];
            if (os === 'windows')
                return [2 /*return*/, "\"python.pythonPath\": \"" + envName + "\\\\Scripts\\\\python.exe\","];
            return [2 /*return*/];
        });
    });
}
/**
 * Flask specific settings
 * @returns {Promise<String>} Mongo URI Settings
 */
function flaskSettings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "\"MONGO_URI\": \"YOUR MONGO URI GOES HERE\""];
        });
    });
}
/**
 * Django specific settings
 * @returns {Pormise<String>} Stripe & AWS Settings
 */
function djangoSettings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "\"STRIPE_PUBLISHABLE\": \"\",\n  \"STRIPE_SECRET\": \"\",\n  \"AWS_ACCESS_KEY_ID\": \"\",\n  \"AWS_SECRET_ACCESS_KEY: \"\",\n  \"AWS_STORAGE_BUCKET_NAME\": \"\""];
        });
    });
}
