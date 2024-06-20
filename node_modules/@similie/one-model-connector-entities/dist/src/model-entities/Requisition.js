"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requisition = void 0;
const model_structures_1 = require("../model-structures");
class Requisition extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'requisitions';
    }
}
exports.Requisition = Requisition;
