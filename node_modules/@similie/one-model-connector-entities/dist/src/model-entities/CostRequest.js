"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostRequest = void 0;
const model_structures_1 = require("../model-structures");
class CostRequest extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'costrequests';
    }
}
exports.CostRequest = CostRequest;
