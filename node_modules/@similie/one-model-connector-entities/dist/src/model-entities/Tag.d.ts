import { ITag } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Tag extends Model<ITag> {
    constructor(connector?: LiveConnectionConstruct);
}
