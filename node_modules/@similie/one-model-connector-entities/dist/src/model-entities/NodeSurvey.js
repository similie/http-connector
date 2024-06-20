"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSurvey = void 0;
const model_structures_1 = require("../model-structures");
class NodeSurvey extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'nodesurveys';
    }
}
exports.NodeSurvey = NodeSurvey;
