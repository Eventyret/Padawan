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
exports.title = exports.getOS = void 0;
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const os_1 = require("os");
/**
 * This will return the name of the platform
 * @returns {Promise<String>} - Name of platform
 */
function getOS() {
    return __awaiter(this, void 0, void 0, function* () {
        const usrPlatform = os_1.platform();
        switch (usrPlatform) {
            case 'win32':
                return 'windows';
            case 'darwin':
                return 'osx';
            case 'linux':
                return 'linux';
            default:
                return;
        }
    });
}
exports.getOS = getOS;
/**
 * Creating custom title
 * @param {String} text - The text to display
 * @param {*} font - The Font used
 */
function title(text, font) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.yellow(figlet_1.default.textSync(text, { horizontalLayout: 'full', font: font ? font : 'Big' })));
    });
}
exports.title = title;
//# sourceMappingURL=common.js.map