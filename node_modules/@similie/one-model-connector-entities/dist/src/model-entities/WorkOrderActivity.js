"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderActivity = void 0;
const model_structures_1 = require("../model-structures");
class WorkOrderActivity extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workorderactivities';
    }
}
exports.WorkOrderActivity = WorkOrderActivity;
