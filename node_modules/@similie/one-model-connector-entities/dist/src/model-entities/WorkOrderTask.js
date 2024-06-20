"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderTask = void 0;
const model_structures_1 = require("../model-structures");
class WorkOrderTask extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workordertasks';
    }
}
exports.WorkOrderTask = WorkOrderTask;
