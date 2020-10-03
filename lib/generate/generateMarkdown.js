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
exports.generateTESTING = exports.generateREADME = void 0;
// TODO: Rewrite better UI / UX
/**
 * Generates the Boilerplate for the Readme file
 * @param {UserOptions} config
 * @returns {Promise<String>} Custom boilerplate for README.md
 */
function generateREADME(config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "\n# " + config.name + "\n<!-- markdownlint-disable MD033 -->\n<div align=\"center\">\n<img src=\"https://upload.wikimedia.org/wikipedia/en/d/d7/Ahsoka_Tano.png\" height=\"350\" width=\"350\">\n</div>\n\nOne or two paragraphs providing an overview of your project.\n\nEssentially, this part is your sales pitch.\n\n## UX\n\nUse this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.\n\nIn particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:\n\n- As a user type, I want to perform an action, so that I can achieve a goal.\n\nThis section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.\n\n## Features\n\nIn this section, you should go over the different parts of your project, and describe each in a sentence or so.\n\n### Existing Features\n\n- Feature 1 - allows users X to achieve Y, by having them fill out Z\n- ...\n\nFor some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.\n\nIn addition, you may also use this section to discuss plans for additional features to be implemented in the future:\n\n### Features Left to Implement\n\n- Another feature idea\n\n## Technologies Used\n\nIn this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.\n\n- [JQuery](https://jquery.com)\n- [The Padwan Project](https://github.com/Eventyret/Padawan)\n\n## Testing\n\nPlease see [Testing](TESTING.md) for all my testing\n\n## Deployment\n\nThis section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).\n\nIn particular, you should provide all details of the differences between the deployed version and the development version, if any, including:\n\n- Different values for environment variables (Heroku Config Vars)?\n- Different configuration files?\n- Separate git branch?\n\nIn addition, if it is not obvious, you should also describe how to run your code locally.\n\n## Credits\n\n### Content\n\n- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)\n\n### Media\n\n- The photos used in this site were obtained from ...\n\n### Acknowledgements\n\n- I received inspiration for this project from X\n- [Simen Daehlin](https://github.com/Eventyret) - [The Padwan Project](https://github.com/Eventyret/Padawan)\n  "];
        });
    });
}
exports.generateREADME = generateREADME;
// TODO: Rewrite with better testing
/**
 *  Generates the Testing.md for the project with boilerplate
 * @returns {String} Full boilerplate for Testing.md
 */
function generateTESTING() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "# Testing\n\n In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.\n\n Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.\n\n For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:\n\n 1. Contact form:\n     1. Go to the \"Contact Us\" page\n     2. Try to submit the empty form and verify that an error message about the required fields appears\n     3. Try to submit the form with an invalid email address and verify that a relevant error message appears\n     4. Try to submit the form with all inputs valid and verify that a success message appears.\n\n In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.\n\n You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.\n\n If this section grows too long, you may want to split it off into a separate file and link to it from here."];
        });
    });
}
exports.generateTESTING = generateTESTING;
