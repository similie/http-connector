import { INodestory } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class NodeStory extends Model<INodestory> {
    constructor(connector?: LiveConnectionConstruct);
}
