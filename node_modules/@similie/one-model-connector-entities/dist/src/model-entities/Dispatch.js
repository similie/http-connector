"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatch = void 0;
const model_structures_1 = require("../model-structures");
class Dispatch extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'dispatches';
    }
}
exports.Dispatch = Dispatch;
