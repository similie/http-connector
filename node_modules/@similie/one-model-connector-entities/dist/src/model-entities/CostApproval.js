"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostApproval = void 0;
const model_structures_1 = require("../model-structures");
class CostApproval extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'costapprovals';
    }
}
exports.CostApproval = CostApproval;
