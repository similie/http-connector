import { INodeschema } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class NodeSchema extends Model<INodeschema> {
    constructor(connector?: LiveConnectionConstruct);
}
