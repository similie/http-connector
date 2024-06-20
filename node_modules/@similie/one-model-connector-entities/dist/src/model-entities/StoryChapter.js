"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryChapter = void 0;
const model_structures_1 = require("../model-structures");
class StoryChapter extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'storychapters';
    }
}
exports.StoryChapter = StoryChapter;
