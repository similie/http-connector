"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const model_structures_1 = require("../model-structures");
class Manager extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'managers';
    }
}
exports.Manager = Manager;
