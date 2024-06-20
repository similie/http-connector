"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualFunction = void 0;
const model_structures_1 = require("../model-structures");
class VirtualFunction extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'virtualfunctions';
    }
}
exports.VirtualFunction = VirtualFunction;
