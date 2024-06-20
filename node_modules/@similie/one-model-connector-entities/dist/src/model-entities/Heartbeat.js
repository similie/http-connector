"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heartbeat = void 0;
const model_structures_1 = require("../model-structures");
class Heartbeat extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'heartbeats';
    }
}
exports.Heartbeat = Heartbeat;
