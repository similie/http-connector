import { IDevicetracker } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class DeviceTracker extends Model<IDevicetracker> {
    constructor(connector?: LiveConnectionConstruct);
}
