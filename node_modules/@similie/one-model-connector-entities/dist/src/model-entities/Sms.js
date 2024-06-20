"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sms = void 0;
const model_structures_1 = require("../model-structures");
class Sms extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'sms';
    }
}
exports.Sms = Sms;
