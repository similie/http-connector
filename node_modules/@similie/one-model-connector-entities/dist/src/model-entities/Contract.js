"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const model_structures_1 = require("../model-structures");
class Contract extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'contracts';
    }
}
exports.Contract = Contract;
