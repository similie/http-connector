"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBadge = void 0;
const model_structures_1 = require("../model-structures");
class UserBadge extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'userbadges';
    }
}
exports.UserBadge = UserBadge;
