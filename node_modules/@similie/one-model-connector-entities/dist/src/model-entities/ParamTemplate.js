"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamTemplate = void 0;
const model_structures_1 = require("../model-structures");
class ParamTemplate extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'paramtemplates';
    }
}
exports.ParamTemplate = ParamTemplate;
