import { IStorychapter } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StoryChapter extends Model<IStorychapter> {
    constructor(connector?: LiveConnectionConstruct);
}
