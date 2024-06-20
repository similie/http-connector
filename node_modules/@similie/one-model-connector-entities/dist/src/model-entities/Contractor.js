"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contractor = void 0;
const model_structures_1 = require("../model-structures");
class Contractor extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'contractors';
    }
}
exports.Contractor = Contractor;
