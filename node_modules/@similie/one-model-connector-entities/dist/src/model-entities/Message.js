"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const model_structures_1 = require("../model-structures");
class Message extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'messages';
    }
}
exports.Message = Message;
