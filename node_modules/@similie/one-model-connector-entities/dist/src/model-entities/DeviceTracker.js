"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTracker = void 0;
const model_structures_1 = require("../model-structures");
class DeviceTracker extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'devicetrackers';
    }
}
exports.DeviceTracker = DeviceTracker;
