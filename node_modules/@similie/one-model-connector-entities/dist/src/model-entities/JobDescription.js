"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDescription = void 0;
const model_structures_1 = require("../model-structures");
class JobDescription extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'jobdescriptions';
    }
}
exports.JobDescription = JobDescription;
