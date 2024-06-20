"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetScheduler = void 0;
const model_structures_1 = require("../model-structures");
class AssetScheduler extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'assetschedulers';
    }
}
exports.AssetScheduler = AssetScheduler;
