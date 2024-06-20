import { IGeofeature } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class GeoFeature extends Model<IGeofeature> {
    constructor(connector?: LiveConnectionConstruct);
}
