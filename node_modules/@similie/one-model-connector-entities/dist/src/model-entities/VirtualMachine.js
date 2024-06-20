"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualMachine = void 0;
const model_structures_1 = require("../model-structures");
class VirtualMachine extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'virtualmachines';
    }
}
exports.VirtualMachine = VirtualMachine;
