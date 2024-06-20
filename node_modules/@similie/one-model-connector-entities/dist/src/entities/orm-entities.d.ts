/// <reference types="node" />
/** @public */
export declare interface ObjectIdLike {
    id: string | Uint8Array;
    __id?: string;
    toHexString(): string;
}
/**
 * A class representation of the BSON ObjectId type.
 * @public
 * @category BSONType
 */
export declare class ObjectId {
    get _bsontype(): 'ObjectId';
    static cacheHexString: boolean;
    /**
     * Create an ObjectId type
     *
     * @param inputId - Can be a 24 character hex string, 12 byte binary Buffer, or a number.
     */
    constructor(inputId?: string | number | ObjectId | ObjectIdLike | Uint8Array);
    /**
     * The ObjectId bytes
     * @readonly
     */
    get id(): Uint8Array;
    set id(value: Uint8Array);
    /** Returns the ObjectId id as a 24 character hex string representation */
    toHexString(): string;
    /**
     * Generate a 12 byte id buffer used in ObjectId's
     *
     * @param time - pass in a second based timestamp.
     */
    static generate(time?: number): Uint8Array;
    /**
     * Converts the id into a 24 character hex string for printing, unless encoding is provided.
     * @param encoding - hex or base64
     */
    toString(encoding?: 'hex' | 'base64'): string;
    /** Converts to its JSON the 24 character hex string representation. */
    toJSON(): string;
    /**
     * Compares the equality of this ObjectId with `otherID`.
     *
     * @param otherId - ObjectId instance to compare against.
     */
    equals(otherId: string | ObjectId | ObjectIdLike): boolean;
    /** Returns the generation date (accurate up to the second) that this ID was generated. */
    getTimestamp(): Date;
    /**
     * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
     *
     * @param time - an integer number representing a number of seconds.
     */
    static createFromTime(time: number): ObjectId;
    /**
     * Creates an ObjectId from a hex string representation of an ObjectId.
     *
     * @param hexString - create a ObjectId from a passed in 24 character hexstring.
     */
    static createFromHexString(hexString: string): ObjectId;
    /** Creates an ObjectId instance from a base64 string */
    static createFromBase64(base64: string): ObjectId;
    /**
     * Checks if a value is a valid bson ObjectId
     *
     * @param id - ObjectId instance to validate.
     */
    static isValid(id: string | number | ObjectId | ObjectIdLike | Uint8Array): boolean;
    inspect(): string;
}
/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
    [key: string]: any;
}
/**
 * Interface for objects that deal with (un)marshalling data.
 */
export interface ValueTransformer {
    /**
     * Used to marshal data when writing to the database.
     */
    to(value: any): any;
    /**
     * Used to unmarshal data when reading from the database.
     */
    from(value: any): any;
}
export declare type FindOperatorType = 'not' | 'lessThan' | 'lessThanOrEqual' | 'moreThan' | 'moreThanOrEqual' | 'equal' | 'between' | 'in' | 'any' | 'isNull' | 'ilike' | 'like' | 'raw' | 'arrayContains' | 'arrayContainedBy' | 'arrayOverlap' | 'and' | 'jsonContains';
declare type SqlGeneratorType = (aliasPath: string) => string;
/**
 * Find Operator used in Find Conditions.
 */
export declare class FindOperator<T> {
    readonly '@instanceof': symbol;
    /**
     * Operator type.
     */
    private _type;
    /**
     * Parameter value.
     */
    private _value;
    /**
     * ObjectLiteral parameters.
     */
    private _objectLiteralParameters;
    /**
     * Indicates if parameter is used or not for this operator.
     */
    private _useParameter;
    /**
     * Indicates if multiple parameters must be used for this operator.
     */
    private _multipleParameters;
    /**
     * SQL generator
     */
    private _getSql;
    constructor(type: FindOperatorType, value: T | FindOperator<T>, useParameter?: boolean, multipleParameters?: boolean, getSql?: SqlGeneratorType, objectLiteralParameters?: ObjectLiteral);
    /**
     * Indicates if parameter is used or not for this operator.
     * Extracts final value if value is another find operator.
     */
    get useParameter(): boolean;
    /**
     * Indicates if multiple parameters must be used for this operator.
     * Extracts final value if value is another find operator.
     */
    get multipleParameters(): boolean;
    /**
     * Gets the Type of this FindOperator
     */
    get type(): FindOperatorType;
    /**
     * Gets the final value needs to be used as parameter value.
     */
    get value(): T;
    /**
     * Gets ObjectLiteral parameters.
     */
    get objectLiteralParameters(): ObjectLiteral | undefined;
    /**
     * Gets the child FindOperator if it exists
     */
    get child(): FindOperator<T> | undefined;
    /**
     * Gets the SQL generator
     */
    get getSql(): SqlGeneratorType | undefined;
    transformValue(transformer: ValueTransformer | ValueTransformer[]): void;
}
export declare class EqualOperator<T> extends FindOperator<T> {
    readonly '@instanceof': symbol;
    constructor(value: T | FindOperator<T>);
}
export declare type FindOptionsWhereProperty<PropertyToBeNarrowed, Property = PropertyToBeNarrowed> = PropertyToBeNarrowed extends Promise<infer I> ? FindOptionsWhereProperty<NonNullable<I>> : PropertyToBeNarrowed extends Array<infer I> ? FindOptionsWhereProperty<NonNullable<I>> : PropertyToBeNarrowed extends Function ? never : PropertyToBeNarrowed extends Buffer ? Property | FindOperator<Property> : PropertyToBeNarrowed extends Date ? Property | FindOperator<Property> : PropertyToBeNarrowed extends ObjectId ? Property | FindOperator<Property> : PropertyToBeNarrowed extends string ? Property | FindOperator<Property> : PropertyToBeNarrowed extends number ? Property | FindOperator<Property> : PropertyToBeNarrowed extends boolean ? Property | FindOperator<Property> : PropertyToBeNarrowed extends object ? FindOptionsWhere<Property> | FindOptionsWhere<Property>[] | EqualOperator<Property> | FindOperator<any> | boolean : Property | FindOperator<Property>;
export declare type FindOptionsWhere<IEntity> = {
    [P in keyof IEntity]?: P extends 'toString' ? unknown : FindOptionsWhereProperty<NonNullable<IEntity[P]>>;
};
/**
 * Make all properties in T optional
 */
export declare type QueryPartialEntity<T> = {
    [P in keyof T]?: T[P] | (() => string);
};
/**
 * Make all properties in T optional. Deep version.
 */
export declare type QueryDeepPartialEntity<T> = _QueryDeepPartialEntity<ObjectLiteral extends T ? unknown : T>;
declare type _QueryDeepPartialEntity<T> = {
    [P in keyof T]?: (T[P] extends Array<infer U> ? Array<_QueryDeepPartialEntity<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<_QueryDeepPartialEntity<U>> : _QueryDeepPartialEntity<T[P]>) | (() => string);
};
export declare type DeepPartial<T> = T | (T extends Array<infer U> ? DeepPartial<U>[] : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer M> ? Set<DeepPartial<M>> : T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T);
export {};
