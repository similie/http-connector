"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const model_structures_1 = require("../model-structures");
class Module extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'modules';
    }
}
exports.Module = Module;
