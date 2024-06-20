import { IDevice } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Device extends Model<IDevice> {
    constructor(connector?: LiveConnectionConstruct);
}
