"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMap = void 0;
const model_structures_1 = require("../model-structures");
class DeviceMap extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'devicemaps';
    }
}
exports.DeviceMap = DeviceMap;
