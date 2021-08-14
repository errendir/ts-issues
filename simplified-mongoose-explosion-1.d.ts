// declare namespace mongodb {
//   export class ObjectId {
//     toHexString(): string;  
//   }
  
//   type RegExpForString<T> = T extends string ? RegExp | T : T;
//   type MongoAltQuery<T> = T extends ReadonlyArray<infer U> ? T | RegExpForString<U> : RegExpForString<T>;

//   export type QuerySelector<T> = {
//     $gte?: T | undefined;
//   };

//   export type RootQuerySelector<T> = { 
//     // Uncomment the following to fix everything
//     // Surprisingly enough this does nothing in the actual mongo typings
//     // __hiddenCovarianter: T
//     $padding001?: Array<FilterQuery<T>> | undefined;
//     $padding002?: Array<FilterQuery<T>> | undefined;
//     $padding003?: Array<FilterQuery<T>> | undefined;
//     $padding004?: Array<FilterQuery<T>> | undefined;
//     $padding005?: Array<FilterQuery<T>> | undefined;
//     $padding006?: Array<FilterQuery<T>> | undefined;
//     $padding007?: Array<FilterQuery<T>> | undefined;
//     $padding008?: Array<FilterQuery<T>> | undefined;
//     $padding009?: Array<FilterQuery<T>> | undefined;
//     $padding010?: Array<FilterQuery<T>> | undefined;
//     $padding011?: Array<FilterQuery<T>> | undefined;
//   };

//   export type Condition<T> = MongoAltQuery<T> | QuerySelector<MongoAltQuery<T>>;

//   export type FilterQuery<T> = {
//       [P in keyof T]?: Condition<T[P]>;
//   } &
//     RootQuerySelector<T>;
// }

// declare module 'mongoose' {
//   class Document {
//     zebra: number;
//     __stamp: "DOCUMENT_STAMP"
//     // toJSON(): LeanDocument<this>;
//     // toObject(): LeanDocument<this>;
//   }

//   // type EnforceDocument<T, TMethods> = T
//   type EnforceDocument<T, TMethods> = T extends Document ? T : T & Document & TMethods;

//   interface Model<T, TQueryHelpers = {}, TMethods = {}> {
//     z: QueryWithHelpers<{}, EnforceDocument<T, TMethods>, TQueryHelpers, T>;
//   }

//   // In the mongoose typings this is triggered by the Schema class
//   class TriggerModelAssignabilityTest<DocType, M extends Model<DocType, any, any> = Model<any, any, any>> {}

//   type QueryWithHelpers<ResultType, DocType, THelpers = {}, RawDocType = DocType> = Query<ResultType, DocType, THelpers, RawDocType> & THelpers;

//   class Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
//     filterExtractedFromParamsOfFind: FilterQuery<DocType>
//   }

//   // type _FilterQuery<T> = {
//   //   [P in keyof T]?: __FilterQuery<P,T>; // __FilterQueryOPTIMAL<P,T[P]> // __FilterQuery<P,T>
//   // } &
//   //   mongodb.RootQuerySelector<DocumentDefinition<T>>;
//   // // Separating this, and doing indexed access outside (only once) shaves off 3500 types from being generated by TS during typechecking
//   // type __FilterQueryOPTIMAL<P,V> = P extends '_id'
//   //   ? [Extract<V, mongodb.ObjectId>] extends [never]
//   //   ? mongodb.Condition<V>
//   //   : mongodb.Condition<V | string | { _id: mongodb.ObjectId }>
//   //   : [Extract<V, mongodb.ObjectId>] extends [never]
//   //   ? mongodb.Condition<V>
//   //   : mongodb.Condition<V | string>;

//   // type __FilterQuery<P extends keyof V,V> = P extends '_id'
//   //   ? [Extract<V[P], mongodb.ObjectId>] extends [never]
//   //   ? mongodb.Condition<V[P]>
//   //   : mongodb.Condition<V[P] | string | { _id: mongodb.ObjectId }>
//   //   : [Extract<V[P], mongodb.ObjectId>] extends [never]
//   //   ? mongodb.Condition<V[P]>
//   //   : mongodb.Condition<V[P] | string>;

//   // type FilterQuery<T> = _FilterQuery<T>;
//   type FilterQuery<T> = mongodb.RootQuerySelector<DocumentDefinition<T>>

//   type _AllowStringsForIds<T> = {
//     [K in keyof T]: __AllowStringsForIds<T[K]>;
//   };
//   type __AllowStringsForIds<V> = [Extract<V, mongodb.ObjectId>] extends [never] ? V : V | string
//   type DocumentDefinition<T> = _AllowStringsForIds<LeanDocument<T>>;

//   type actualPrimitives = string | boolean | number | symbol | null | undefined;
//   type TreatAsPrimitives = actualPrimitives | RegExp | symbol | Error;

//   type LeanType<T> =
//     0 extends (1 & T) ? T : // any
//     T extends TreatAsPrimitives ? T : // primitives
//     LeanDocument<T>; // Documents and everything else

//   type LeanArray<T extends unknown[]> = T extends unknown[][] ? LeanArray<T[number]>[] : LeanType<T[number]>[];

//   type _LeanDocument<T> = {
//     [K in keyof T]: LeanDocumentElement<T[K]>;
//   };

//   type LeanDocumentElement<T> =
//     0 extends (1 & T) ? T : // any
//     T extends unknown[] ? LeanArray<T> : // Array
//     T extends Document ? LeanDocument<T> : // Subdocument
//     T;

//   type LeanDocument<T> = Omit<_LeanDocument<T>, Exclude<keyof Document, '_id' | 'id' | '__v'> | '$isSingleNested'>;
// }