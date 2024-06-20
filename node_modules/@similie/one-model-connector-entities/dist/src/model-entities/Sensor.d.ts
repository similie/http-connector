import { ISensor } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Sensor extends Model<ISensor> {
    constructor(connector?: LiveConnectionConstruct);
}
