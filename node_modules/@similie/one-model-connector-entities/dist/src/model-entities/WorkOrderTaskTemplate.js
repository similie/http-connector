"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderTaskTemplate = void 0;
const model_structures_1 = require("../model-structures");
class WorkOrderTaskTemplate extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workordertasktemplates';
    }
}
exports.WorkOrderTaskTemplate = WorkOrderTaskTemplate;
