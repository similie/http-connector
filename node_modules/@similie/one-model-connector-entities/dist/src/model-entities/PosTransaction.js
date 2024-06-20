"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosTransaction = void 0;
const model_structures_1 = require("../model-structures");
class PosTransaction extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'postransactions';
    }
}
exports.PosTransaction = PosTransaction;
