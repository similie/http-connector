import { IDeviceaction } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class DeviceAction extends Model<IDeviceaction> {
    constructor(connector?: LiveConnectionConstruct);
}
