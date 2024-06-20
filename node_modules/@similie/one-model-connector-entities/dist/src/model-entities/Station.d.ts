import { IStation } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Station extends Model<IStation> {
    constructor(connector?: LiveConnectionConstruct);
}
