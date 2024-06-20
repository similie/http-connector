"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const model_structures_1 = require("../model-structures");
class Report extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'reports';
    }
}
exports.Report = Report;
