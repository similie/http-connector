import { IVirtualmachine } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class VirtualMachine extends Model<IVirtualmachine> {
    constructor(connector?: LiveConnectionConstruct);
}
