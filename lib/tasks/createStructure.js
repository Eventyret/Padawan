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
exports.createProjectDir = exports.copyFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const ncp_1 = __importDefault(require("ncp"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const mkdir = util_1.promisify(fs_1.default.mkdir);
const copy = util_1.promisify(ncp_1.default);
const read = util_1.promisify(fs_1.default.readdir);
/**
 * Copies the setup folder per project.
 * @param {Object) options
 */
function copyFiles(options, type) {
    return __awaiter(this, void 0, void 0, function* () {
        yield copy(checkCopyType(options, type), options.targetDirectory, {
            clobber: false,
        });
    });
}
exports.copyFiles = copyFiles;
/**
 * Creates the main Project directory.
 * @param {Object} options
 * @returns {Promise} Target Directory if created
 */
function createProjectDir(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options.targetDirectory = path_1.default.resolve(process.cwd(), options.name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase());
        yield read(options.targetDirectory);
        return mkdir(options.targetDirectory);
    });
}
exports.createProjectDir = createProjectDir;
/**
 *  Checks what folder to copy
 * @param {Object} options
 * @param {String} type - Name of the folder
 */
function checkCopyType(options, type) {
    switch (type) {
        case "templates":
            return options.templateDirectory;
        case "common":
            return options.commonDir;
        case "backend":
            return options.backendDir;
        case "frontend":
            return options.frontendDir;
        default:
            return null;
    }
}
//# sourceMappingURL=createStructure.js.map