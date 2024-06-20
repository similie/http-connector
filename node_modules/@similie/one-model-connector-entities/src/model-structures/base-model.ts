import {
  QueryDecorators,
  QueryPopulantDecorators,
  QueryStreamDecorators,
} from '.';
import { ModelInstance } from '.';
import {
  IEntity,
  IModelConnect,
  LiveConnectionConstruct,
  IModelConfigurationDetails,
  IQueryOrPartial,
  IEntityPartial,
  IValuesToEscape,
  IQueryBaseType,
} from '../entities';

import { GlobalConnection } from '../global-connect';
import { getId } from '../utils';

/**
 * @class
 * @name Model
 * @description working base class for connector communication
 * @param {LiveConnectionConstruct?} connector
 */
export class Model<T extends IEntity> implements IModelConnect<T> {
  private _modelConfig: IModelConfigurationDetails;
  private _connector: LiveConnectionConstruct;
  private _modelInstance: ModelInstance<T>;
  public constructor(connector?: LiveConnectionConstruct) {
    // we can take a connector from the constructor
    if (connector) {
      this._connector = connector;
    } else if (GlobalConnection.hasConnection()) {
      // for if it is statically defined
      const globalConfig = GlobalConnection.getInstance();
      this._connector = globalConfig.connector;
    } else {
      throw new Error(
        'A valid connection is required to instantiate this model'
      );
    }
    // [AS] we are only defining the modelname currently for the configuration
    // we can also apply other attributes for future functionality
    this._modelConfig = this._connector.modelConfig;
    // [AS] this will build the model with the specific entity
    this._modelInstance = new ModelInstance<T>(
      this.connector,
      this.modelConfig
    );
  }
  // getters
  public get modelInstance() {
    return this._modelInstance;
  }

  public get connector() {
    return this._connector;
  }

  public get modelConfig(): IModelConfigurationDetails {
    return this._modelConfig;
  }

  protected get modelname() {
    return this.modelConfig.modelname;
  }
  // setters
  protected set modelname(modelname) {
    this.modelConfig.modelname = modelname;
  }

  protected set modelConfig(modelConfig: IModelConfigurationDetails) {
    this._modelConfig = modelConfig;
  }

  /**
   * @name raw
   * @description used for raw access to the ORM namedspaced
   *    by the registry
   * @returns {LiveConnectionConstruct} a raw instance of the connector model
   */
  public raw() {
    return this.connector?.raw(this.modelConfig);
  }

  /**
   * @name getId
   * @description tries to pull an id param from the payload
   * @param {number | IEntity | undefined | null} query
   * @returns {number | null}
   */
  public getId(query: number | T | undefined | null): number | undefined {
    return getId(query) as number | undefined;
  }

  /**
   * @name initWithId
   * @description starts a query for a model entity
   * @param {number} id
   * @returns {QyeryPopulantDecorators<IEntity>}
   */
  public initWithId(id: number) {
    const decorator = new QueryDecorators<T>(this, { id: id });
    return new QueryPopulantDecorators<T>(decorator);
  }

  /**
   * @name find
   * @description starts a search query with chainable functions
   * @param {IQueryOrPartial<T>} query
   * @returns {QueryDecorators<IEntity>}
   */
  public find(query?: IQueryOrPartial<T>) {
    return new QueryDecorators<T>(this, query);
  }

  /**
   * @name save
   * @description saves a single record
   * @param {IEntity} values
   * @returns {Promise<IEntity>} saved values
   */
  public async save(values: T): Promise<T> {
    const updated = <T>await this.connector?.save(values, this.modelConfig);
    return this.modelInstance.applyOne(updated) as Promise<T>;
  }

  /**
   * @name update
   * @description updates multiple records
   * @param {IQueryOrPartial<T>} query
   * @param {IEntityPartial<T>} update values to saved to entity
   * @returns {Promise<IEntity[]>} saved records
   */
  public async update(query: IQueryBaseType<T>, update: IEntityPartial<T>) {
    const updated = <T[]>(
      await this.connector?.update(query, update, this.modelConfig)
    );
    return this.modelInstance.applyMany(updated) as Promise<T[]>;
  }

  /**
   * @name count
   * @description counts the number of elements based in a given query
   * @param {IQueryOrPartial<T>} query parameters to count
   * @returns {Promise<number>}
   */
  public async count(query?: IQueryOrPartial<T>) {
    return await this.connector?.count(
      query as IQueryOrPartial<IEntity>,
      this.modelConfig
    );
  }

  /**
   * @name destroy
   * @description destroys a single record
   * @param {IEntity} value
   * @returns {Promise<IEntity>} deleted record if avaible
   */
  public async destroy(value: IEntityPartial<T> | number) {
    // [AS] I don't bother sending through the model instance
    // param since it is destroyed now
    return <T>await this.connector?.destroy(value, this.modelConfig);
  }

  /**
   * @name destroyAll
   * @description destroys multiple records depending one query
   * @param {IQueryOrPartial<T>} query
   * @returns {Promise<IEntity[]>} destroyed records
   */
  public async destroyAll(query: IQueryBaseType<T>) {
    return <T[]>await this.connector?.destroyAll(query, this.modelConfig);
  }

  /**
   * @name create
   * @description creates a new model
   * @param { IEntityPartial<T>} query any the values to be created
   * @returns {Promise<IEntity>} newly created model
   */
  public async create(query: IEntityPartial<T>) {
    const created = <T>await this.connector?.create(query, this.modelConfig);
    return this.modelInstance.applyOne(created) as Promise<T>;
  }

  /**
   * @name createMany
   * @description creates a lot of records of a givin type
   * @param {IEntityPartial<T>[]} query
   * @returns {Promise<IEntity[]>} newly created models
   */
  public async createMany(query: IEntityPartial<T>[]) {
    const created = <T[]>(
      await this.connector?.createMany(query, this.modelConfig)
    );
    return this.modelInstance.applyMany(created) as Promise<T[]>;
  }

  /**
   * @public
   * @name findOrCreate
   * @description finds a model based on the given criteria. The model criteria does
   *   not exist in the database, it creates a model with the initials values
   * @param {IQueryOrPartial<IEntity>} criteria
   * @param {IEntityPartial<IEntity>} initialValues
   * @returns {Promise<IEntity>}
   */
  public async findOrCreate(
    criteria: IQueryOrPartial<T>,
    initialValues: IEntityPartial<T>
  ) {
    const foundOrCreated = <T>(
      await this.connector?.findOrCreate(
        criteria,
        initialValues,
        this.modelConfig
      )
    );
    return this.modelInstance.applyOne(foundOrCreated) as Promise<T>;
  }

  /**
   * @public
   * @name avg
   * @description gets the average for a numeric parameter
   * @param {keyofT} numericAttrName
   * @param {IQueryOrPartial<T>?} criteria
   * @returns {Promise<number>}
   */
  public async avg(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>) {
    return this.connector?.avg(
      numericAttrName as keyof IEntity,
      criteria,
      this.modelConfig
    );
  }

  /**
   * @public
   * @name sum
   * @param {keyofT} numericAttrName
   * @param {IQueryOrPartial<T>?} criteria
   * @description gets the sum for a numeric parameter
   * @returns {Promise<ISumType>}
   */
  public async sum(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>) {
    return this.connector?.sum(
      numericAttrName as keyof IEntity,
      criteria,
      this.modelConfig
    );
  }

  /**
   * @public
   * @name stream
   * @description streams records from the database instream of buffering
   *   all records. This is good for API calls with massive datasets
   * @param {any} query
   * @returns {QueryStreamDecorators<IEntity>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public stream(query: any) {
    return new QueryStreamDecorators<T>(this, query);
  }
  /**
   * @public
   * @name toJson
   * @description allows for an object override to occur. The default
   *  bechavior will simply return the model. However, it can be overriden
   *  in the individual model entities. Useful for sending data over the api
   * @param {IEntity} model {IEntity}
   * @returns {any}
   */
  public async toJson(model: T) {
    return model;
  }

  /**
   * @public
   * @name query
   * @description generates a row sql query to the connector
   * @param {string} query
   * @param {IValuesToEscape} valuesToEscape
   * @returns {any} the queried results
   */
  public async query(query: string, valuesToEscape?: IValuesToEscape) {
    return this.connector?.query(query, valuesToEscape, this.modelConfig);
  }

  /**
   * @public
   * @name attr
   * @description pulls the attribute values from the model
   * @returns {Record<string, string>}
   */
  public attr() {
    return this.connector?.attr(this.modelConfig);
  }
}
