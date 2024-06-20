"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkorderFile = void 0;
const model_structures_1 = require("../model-structures");
class WorkorderFile extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workorderfiles';
    }
}
exports.WorkorderFile = WorkorderFile;
