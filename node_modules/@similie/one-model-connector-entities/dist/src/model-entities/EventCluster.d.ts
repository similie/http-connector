import { IEventcluster } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventCluster extends Model<IEventcluster> {
    constructor(connector?: LiveConnectionConstruct);
}
