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
exports.generateENVFile = void 0;
// prettier-ignore
/**
 * Generate environmental variables
 * for env.py
 * @param {Object} options
 * @returns {Promise<String>} Hostname and random generated string
 */
function generateENVFile(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return `import os
os.environ["HOSTNAME"] = "0.0.0.0"
os.environ["SECRET_KEY"] =  "${Math.random()
            .toString(36)
            .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)}"
os.environ["DEV"]: "1"
${options.template.flask ? flaskOnly() : djangoOnly()}`; // jshint ignore:line
    });
}
exports.generateENVFile = generateENVFile;
/**
 * Generate variables only used by flask
 * @returns {String} MongoDB information and Port
 */
function flaskOnly() {
    return `os.environ["MONGO_URI"] ="YOUR MONGO URI GOES HERE"
os.environ["MONGO_DBNAME"] ="YOUR MONGO DB NAME GOES HERE"
os.environ["PORT"] ="5000"
`;
}
/**
 * Generate variables only used by Django
 * @returns {String} Stripe & AWS information
 */
function djangoOnly() {
    return `os.environ["STRIPE_PUBLISHABLE"] = ""
os.environ["STRIPE_SECRET"] = ""
os.environ["AWS_ACCESS_KEY_ID"] = ""
os.environ["AWS_SECRET_ACCESS_KEY"] = ""
os.environ["AWS_STORAGE_BUCKET_NAME"] = ""
  `;
}
//# sourceMappingURL=generateENV.js.map