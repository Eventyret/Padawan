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
exports.generateRequirements = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const append = util_1.promisify(fs_1.default.appendFile);
/**
 * Generates the requirements.txt for Milestone 3 or Milestone 4
 * @param {Object} options
 */
function generateRequirements(options) {
    return __awaiter(this, void 0, void 0, function* () {
        //prettier-ignore
        let requirements = options.template.flask ? 'Flask\npymongo\npylint_flask' : 'Django\npylint_django';
        yield append(options.targetDirectory + '/requirements.txt', `\n${requirements}`);
    });
}
exports.generateRequirements = generateRequirements;
//# sourceMappingURL=generateRequirements.js.map