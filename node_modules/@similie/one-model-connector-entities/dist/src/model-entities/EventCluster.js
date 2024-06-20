"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCluster = void 0;
const model_structures_1 = require("../model-structures");
class EventCluster extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventclusters';
    }
}
exports.EventCluster = EventCluster;
