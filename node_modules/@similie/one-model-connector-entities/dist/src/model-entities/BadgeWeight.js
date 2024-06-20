"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeWeight = void 0;
const model_structures_1 = require("../model-structures");
class BadgeWeight extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'badgeweights';
    }
}
exports.BadgeWeight = BadgeWeight;
