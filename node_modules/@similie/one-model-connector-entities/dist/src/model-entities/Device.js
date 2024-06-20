"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const model_structures_1 = require("../model-structures");
class Device extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'devices';
    }
}
exports.Device = Device;
