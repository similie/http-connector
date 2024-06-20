"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceAction = void 0;
const model_structures_1 = require("../model-structures");
class DeviceAction extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'deviceactions';
    }
}
exports.DeviceAction = DeviceAction;
