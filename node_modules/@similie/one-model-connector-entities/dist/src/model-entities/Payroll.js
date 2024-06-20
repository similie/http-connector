"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payroll = void 0;
const model_structures_1 = require("../model-structures");
class Payroll extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'payrolls';
    }
}
exports.Payroll = Payroll;
