import { IEntity, IModelCollection, IQueryLimiters, LiveConnectionConstruct, IModelConfigurationDetails, IQueryOrPartial, IEntityPartial, IValuesToEscape } from '../entities';
export declare class LiveConnectConfig implements IModelConfigurationDetails {
    private _name;
    constructor();
    get modelname(): string;
    set modelname(modelname: string);
}
/**
 * @class
 * @name LiveConnection
 *
 * @description The purpose of live connect is so that a single class
 * can manage the start instance. Also, the child classes can safely
 * choose to NOT implement certain functions such as init or teardown
 * if they are not required. Additionally, for future functionality
 * we can use this class to implement parent logic that all the child classes
 * can extend without changing the structure of the child class. Finally,
 * to create a new connector, you simply copy this class and populate the
 * public functions with the desired logic
 */
export declare abstract class LiveConnection implements LiveConnectionConstruct {
    constructor(global?: boolean);
    getId(query: number | any | undefined | null): number | null;
    init(): Promise<null>;
    get modelConfig(): LiveConnectConfig;
    raw(config?: IModelConfigurationDetails): void;
    find(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): any;
    findOne(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): any;
    save(values: any, config?: IModelConfigurationDetails): Promise<any>;
    update(query: any, update: any, config?: IModelConfigurationDetails): Promise<any>;
    count(query: any, config?: IModelConfigurationDetails): Promise<any>;
    destroy(query: any, config?: IModelConfigurationDetails): Promise<any>;
    create(query: any, config?: IModelConfigurationDetails): Promise<any>;
    createMany(query: any[], config?: IModelConfigurationDetails): Promise<any>;
    destroyAll(query: any, config?: IModelConfigurationDetails): Promise<any>;
    addToCollection(value: any, collection: IModelCollection<IEntity>): Promise<void>;
    removeFromCollection(value: any, collection: IModelCollection<IEntity>): Promise<void>;
    attr(config?: IModelConfigurationDetails): any;
    keys(config?: IModelConfigurationDetails): string[];
    sum(numericAttrName: keyof IEntity, criteria?: IQueryOrPartial<IEntity>, config?: IModelConfigurationDetails): Promise<any>;
    avg(numericAttrName: keyof IEntity, criteria?: IQueryOrPartial<IEntity>, config?: IModelConfigurationDetails): Promise<any>;
    findOrCreate(criteria: IQueryOrPartial<IEntity>, initialsValues: IEntityPartial<IEntity>, config?: IModelConfigurationDetails): Promise<any>;
    streamEach(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: IEntity) => Promise<void> | void): Promise<any>;
    streamBatch(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: IEntity[]) => Promise<void> | void): Promise<any>;
    tearDown(): Promise<void>;
    query(query: string, valuesToEscape?: IValuesToEscape, config?: IModelConfigurationDetails): Promise<any>;
}
