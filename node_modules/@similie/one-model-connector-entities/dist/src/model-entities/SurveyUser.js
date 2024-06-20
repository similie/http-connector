"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyUser = void 0;
const model_structures_1 = require("../model-structures");
class SurveyUser extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'surveyusers';
    }
}
exports.SurveyUser = SurveyUser;
