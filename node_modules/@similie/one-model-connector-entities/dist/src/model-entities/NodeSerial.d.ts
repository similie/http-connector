import { INodeserial } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class NodeSerial extends Model<INodeserial> {
    constructor(connector?: LiveConnectionConstruct);
}
