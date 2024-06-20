import { IStoryboard } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StoryBoard extends Model<IStoryboard> {
    constructor(connector?: LiveConnectionConstruct);
}
