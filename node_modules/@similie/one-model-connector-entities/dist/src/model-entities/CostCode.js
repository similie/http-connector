"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCode = void 0;
const model_structures_1 = require("../model-structures");
class CostCode extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'costcodes';
    }
}
exports.CostCode = CostCode;
