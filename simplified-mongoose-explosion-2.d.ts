declare namespace Simplified2 {
    type RegExpForString<T> = T extends string ? RegExp | T : T;
    type MongoAltQuery<T> = T extends ReadonlyArray<infer U> ? T | RegExpForString<U> : RegExpForString<T>;

    type _FilterQuery<T> = {
        [P in keyof T]?: MongoAltQuery<T[P]>;
    } &
      RootQuerySelector<T>;

    // Changing this to type instead of interface degrades the performance
    interface RootQuerySelector<T> { 
      // Uncomment the following to fix everything
      // Surprisingly enough this does nothing in the actual mongo typings
      // __hiddenCovarianter: T
      $padding001?: _FilterQuery<T>;
      $padding002?: _FilterQuery<T>;
      $padding003?: _FilterQuery<T>;
      $padding004?: _FilterQuery<T>;
      $padding005?: _FilterQuery<T>;
      $padding006?: _FilterQuery<T>;
      $padding007?: _FilterQuery<T>;
      $padding008?: _FilterQuery<T>;
      $padding009?: _FilterQuery<T>;
      $padding010?: _FilterQuery<T>;
      $padding011?: _FilterQuery<T>;
      $padding012?: _FilterQuery<T>;
      $padding013?: _FilterQuery<T>;
      $padding014?: _FilterQuery<T>;
      $padding015?: _FilterQuery<T>;
      $padding016?: _FilterQuery<T>;
      $padding017?: _FilterQuery<T>;
      $padding018?: _FilterQuery<T>;
      $padding019?: _FilterQuery<T>;
    }

    class Document {
        __stamp: "DOCUMENT_STAMP"
    }	

    // Using EnforceDocument instead of inlining it below actually helps
    type EnforceDocument<T, TMethods> = T extends Document ? T : T & Document & TMethods;

    interface Model<T, TMethods = {}> {
        z: FilterQuery<T & Document & TMethods>;
    }

    // In the mongoose typings this is triggered by the Schema class
    class TriggerModelAssignabilityTest<DocType, M extends Model<DocType, any> = Model<any, any>> {}

    type FilterQuery<T> = RootQuerySelector<LeanDocument<T>>

    type _LeanDocument<T> = {
        [K in keyof T]: LeanDocumentElement<T[K]>;
    };

    type LeanDocumentElement<T> =
        0 extends (1 & T) ? T : // any
        T extends Document ? LeanDocument<T> : // Subdocument
        T;

    type LeanDocument<T> = Omit<_LeanDocument<T>, keyof Document>;
}