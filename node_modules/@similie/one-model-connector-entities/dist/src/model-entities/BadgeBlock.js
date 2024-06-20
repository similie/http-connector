"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeBlock = void 0;
const model_structures_1 = require("../model-structures");
class BadgeBlock extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'badgeblocks';
    }
}
exports.BadgeBlock = BadgeBlock;
