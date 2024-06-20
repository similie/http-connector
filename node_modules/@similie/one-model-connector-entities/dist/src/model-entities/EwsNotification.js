"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EwsNotification = void 0;
const model_structures_1 = require("../model-structures");
class EwsNotification extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'ewsnotifications';
    }
}
exports.EwsNotification = EwsNotification;
