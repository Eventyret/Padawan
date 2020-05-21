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
exports.generateHTML = void 0;
/**
 * This will generate the html for Milestone 1 and Milestone 2
 * @param {UserOptions} config - Configuration options
 * @returns {Promise<String>} Customized HTML 5 Boiler template
 */
function generateHTML(config) {
    return __awaiter(this, void 0, void 0, function () {
        var script, head, extra, html;
        return __generator(this, function (_a) {
            script = config.template.js ? "<script src=\"assets/js/app.js\"></script>" : '';
            head = "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n\t<meta charset=\"UTF-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css\">\n\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css\">\n\t<link rel=\"stylesheet\" href=\"assets/css/style.css\">\n\t<title>" + config.name + "</title>\n  </head>\n  ";
            extra = config.clean ? '' : "\n  <main class=\"container\">\n\t<section class=\"row\">\n\t\t<div class=\"col-12\">\n\t\t\t<img src=\"https://upload.wikimedia.org/wikipedia/en/d/d7/Ahsoka_Tano.png\" class=\"img-fluid mx-auto d-block\" alt=\"Padwan tool\"/>\n\t\t\t<h2 class=\"text-center\">Thank you for using the Padwan tool to setup your <b>" + config.name + "</b> Project</h2>\n\t\t</div>\n\t</section>\n</main>\n  ";
            html = head + "\n  <body>\n  " + extra + "\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js\"></script>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js\"></script>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js\"></script>\n  " + script + "\n</body>\n</html>";
            return [2 /*return*/, html];
        });
    });
}
exports.generateHTML = generateHTML;
