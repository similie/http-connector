"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBroadcast = void 0;
const model_structures_1 = require("../model-structures");
class EventBroadcast extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventbroadcasts';
    }
}
exports.EventBroadcast = EventBroadcast;
