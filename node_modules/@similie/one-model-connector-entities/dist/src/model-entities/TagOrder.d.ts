import { ITagorder } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class TagOrder extends Model<ITagorder> {
    constructor(connector?: LiveConnectionConstruct);
}
