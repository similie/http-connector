"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollPayscale = void 0;
const model_structures_1 = require("../model-structures");
class PayrollPayscale extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'payrollpayscales';
    }
}
exports.PayrollPayscale = PayrollPayscale;
