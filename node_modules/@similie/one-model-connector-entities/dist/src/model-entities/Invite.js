"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invite = void 0;
const model_structures_1 = require("../model-structures");
class Invite extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'invites';
    }
}
exports.Invite = Invite;
