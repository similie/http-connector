"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBatchList = void 0;
const model_structures_1 = require("../model-structures");
class EventBatchList extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'eventbatchlists';
    }
}
exports.EventBatchList = EventBatchList;
