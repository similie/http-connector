"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messaging = void 0;
const model_structures_1 = require("../model-structures");
class Messaging extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'messagings';
    }
}
exports.Messaging = Messaging;
