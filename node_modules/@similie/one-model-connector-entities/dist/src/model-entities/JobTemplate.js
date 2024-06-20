"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTemplate = void 0;
const model_structures_1 = require("../model-structures");
class JobTemplate extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'jobtemplates';
    }
}
exports.JobTemplate = JobTemplate;
