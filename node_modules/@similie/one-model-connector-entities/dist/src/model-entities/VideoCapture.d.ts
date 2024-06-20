import { IVideocapture } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class VideoCapture extends Model<IVideocapture> {
    constructor(connector?: LiveConnectionConstruct);
}
