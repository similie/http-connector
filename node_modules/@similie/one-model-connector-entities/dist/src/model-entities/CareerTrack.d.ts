import { ICareertrack } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class CareerTrack extends Model<ICareertrack> {
    constructor(connector?: LiveConnectionConstruct);
}
