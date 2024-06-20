"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchReport = void 0;
const model_structures_1 = require("../model-structures");
class BatchReport extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'batchreports';
    }
}
exports.BatchReport = BatchReport;
