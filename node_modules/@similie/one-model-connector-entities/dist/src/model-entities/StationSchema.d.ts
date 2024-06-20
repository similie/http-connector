import { IStationschema } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationSchema extends Model<IStationschema> {
    constructor(connector?: LiveConnectionConstruct);
}
