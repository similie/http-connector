"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrder = void 0;
const model_structures_1 = require("../model-structures");
class WorkOrder extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workorders';
    }
}
exports.WorkOrder = WorkOrder;
