import { QueryDecorators, QueryPopulantDecorators, QueryStreamDecorators } from '.';
import { ModelInstance } from '.';
import { IEntity, IModelConnect, LiveConnectionConstruct, IModelConfigurationDetails, IQueryOrPartial, IEntityPartial, IValuesToEscape, IQueryBaseType } from '../entities';
/**
 * @class
 * @name Model
 * @description working base class for connector communication
 * @param {LiveConnectionConstruct?} connector
 */
export declare class Model<T extends IEntity> implements IModelConnect<T> {
    private _modelConfig;
    private _connector;
    private _modelInstance;
    constructor(connector?: LiveConnectionConstruct);
    get modelInstance(): ModelInstance<T>;
    get connector(): LiveConnectionConstruct;
    get modelConfig(): IModelConfigurationDetails;
    protected get modelname(): string | undefined;
    protected set modelname(modelname: string | undefined);
    protected set modelConfig(modelConfig: IModelConfigurationDetails);
    /**
     * @name raw
     * @description used for raw access to the ORM namedspaced
     *    by the registry
     * @returns {LiveConnectionConstruct} a raw instance of the connector model
     */
    raw(): any;
    /**
     * @name getId
     * @description tries to pull an id param from the payload
     * @param {number | IEntity | undefined | null} query
     * @returns {number | null}
     */
    getId(query: number | T | undefined | null): number | undefined;
    /**
     * @name initWithId
     * @description starts a query for a model entity
     * @param {number} id
     * @returns {QyeryPopulantDecorators<IEntity>}
     */
    initWithId(id: number): QueryPopulantDecorators<T>;
    /**
     * @name find
     * @description starts a search query with chainable functions
     * @param {IQueryOrPartial<T>} query
     * @returns {QueryDecorators<IEntity>}
     */
    find(query?: IQueryOrPartial<T>): QueryDecorators<T>;
    /**
     * @name save
     * @description saves a single record
     * @param {IEntity} values
     * @returns {Promise<IEntity>} saved values
     */
    save(values: T): Promise<T>;
    /**
     * @name update
     * @description updates multiple records
     * @param {IQueryOrPartial<T>} query
     * @param {IEntityPartial<T>} update values to saved to entity
     * @returns {Promise<IEntity[]>} saved records
     */
    update(query: IQueryBaseType<T>, update: IEntityPartial<T>): Promise<T[]>;
    /**
     * @name count
     * @description counts the number of elements based in a given query
     * @param {IQueryOrPartial<T>} query parameters to count
     * @returns {Promise<number>}
     */
    count(query?: IQueryOrPartial<T>): Promise<number>;
    /**
     * @name destroy
     * @description destroys a single record
     * @param {IEntity} value
     * @returns {Promise<IEntity>} deleted record if avaible
     */
    destroy(value: IEntityPartial<T> | number): Promise<T>;
    /**
     * @name destroyAll
     * @description destroys multiple records depending one query
     * @param {IQueryOrPartial<T>} query
     * @returns {Promise<IEntity[]>} destroyed records
     */
    destroyAll(query: IQueryBaseType<T>): Promise<T[]>;
    /**
     * @name create
     * @description creates a new model
     * @param { IEntityPartial<T>} query any the values to be created
     * @returns {Promise<IEntity>} newly created model
     */
    create(query: IEntityPartial<T>): Promise<T>;
    /**
     * @name createMany
     * @description creates a lot of records of a givin type
     * @param {IEntityPartial<T>[]} query
     * @returns {Promise<IEntity[]>} newly created models
     */
    createMany(query: IEntityPartial<T>[]): Promise<T[]>;
    /**
     * @public
     * @name findOrCreate
     * @description finds a model based on the given criteria. The model criteria does
     *   not exist in the database, it creates a model with the initials values
     * @param {IQueryOrPartial<IEntity>} criteria
     * @param {IEntityPartial<IEntity>} initialValues
     * @returns {Promise<IEntity>}
     */
    findOrCreate(criteria: IQueryOrPartial<T>, initialValues: IEntityPartial<T>): Promise<T>;
    /**
     * @public
     * @name avg
     * @description gets the average for a numeric parameter
     * @param {keyofT} numericAttrName
     * @param {IQueryOrPartial<T>?} criteria
     * @returns {Promise<number>}
     */
    avg(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>): Promise<import("../entities").IAvgType>;
    /**
     * @public
     * @name sum
     * @param {keyofT} numericAttrName
     * @param {IQueryOrPartial<T>?} criteria
     * @description gets the sum for a numeric parameter
     * @returns {Promise<ISumType>}
     */
    sum(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>): Promise<import("../entities").ISumType>;
    /**
     * @public
     * @name stream
     * @description streams records from the database instream of buffering
     *   all records. This is good for API calls with massive datasets
     * @param {any} query
     * @returns {QueryStreamDecorators<IEntity>}
     */
    stream(query: any): QueryStreamDecorators<T>;
    /**
     * @public
     * @name toJson
     * @description allows for an object override to occur. The default
     *  bechavior will simply return the model. However, it can be overriden
     *  in the individual model entities. Useful for sending data over the api
     * @param {IEntity} model {IEntity}
     * @returns {any}
     */
    toJson(model: T): Promise<T>;
    /**
     * @public
     * @name query
     * @description generates a row sql query to the connector
     * @param {string} query
     * @param {IValuesToEscape} valuesToEscape
     * @returns {any} the queried results
     */
    query(query: string, valuesToEscape?: IValuesToEscape): Promise<any>;
    /**
     * @public
     * @name attr
     * @description pulls the attribute values from the model
     * @returns {Record<string, string>}
     */
    attr(): Promise<Record<string, import("../entities").IModelAttributes>>;
}
