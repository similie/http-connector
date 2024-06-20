"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBoard = void 0;
const model_structures_1 = require("../model-structures");
class StoryBoard extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'storyboards';
    }
}
exports.StoryBoard = StoryBoard;
