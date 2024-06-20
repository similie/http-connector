import { IAvgType, IEntity, IModelAttributes, IModelConfigurationDetails, ISumType } from '.';
import { IEntityPartial, IQueryBaseType, IValuesToEscape } from './base-entity';
import { IQueryOrPartial } from './queries';
/**
 * @interface ISharedDataConnects
 * @description used by both the model class and connector class
 * to give a common set of functionality between the two entities;
 * Because the connector is often instantiated once. I have an extra param
 * register to pass context to the connector class. Otherwise, it wouldn't know
 * it's modelname or other identifies required to process the translation
 */
export interface ISharedDataConnects<T extends IEntity> {
    save: (values: T, config?: IModelConfigurationDetails) => Promise<T>;
    update: (query: IQueryBaseType<T>, update: IEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T[]>;
    count: (query: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<number>;
    destroy: (query: number | IEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    destroyAll: (query: IQueryBaseType<T>, config?: IModelConfigurationDetails) => Promise<T[]>;
    create: (model: IEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    createMany: (query: IEntityPartial<T>[], config?: IModelConfigurationDetails) => Promise<T[]>;
    raw: (config?: IModelConfigurationDetails) => any;
    findOrCreate: (criteria: IQueryOrPartial<T>, initialValues: IEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    sum: (numericAttrName: keyof T, criteria?: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<ISumType>;
    avg: (numericAttrName: keyof T, criteria?: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<IAvgType>;
    query: (nativeQuery: string, valuesToEscape?: IValuesToEscape, config?: IModelConfigurationDetails) => Promise<any>;
    attr: (config?: IModelConfigurationDetails) => Promise<Record<string, IModelAttributes>>;
}
