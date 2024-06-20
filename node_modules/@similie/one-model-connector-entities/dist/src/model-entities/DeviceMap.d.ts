import { IDevicemap } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class DeviceMap extends Model<IDevicemap> {
    constructor(connector?: LiveConnectionConstruct);
}
