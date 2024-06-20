import { IDevicemaintenance } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class DeviceMaintenance extends Model<IDevicemaintenance> {
    constructor(connector?: LiveConnectionConstruct);
}
