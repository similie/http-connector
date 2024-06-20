import { IDocumentation } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Documentation extends Model<IDocumentation> {
    constructor(connector?: LiveConnectionConstruct);
}
