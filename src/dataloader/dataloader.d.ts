import { BatchLoadFn } from 'dataloader';

/**
 * Makes a class implement a `getBatchOne()` batch method
 *
 * @param TKey The type of a key item
 * @param TValue The type of a batched return value
 */
export interface HasBatchedGetOne<TKey = string, TValue = unknown> {
  /**
   * Batch function that return a single batched value per key
   */
  getBatchOne: BatchLoadFn<TKey, TValue>;
}

/**
 * Makes a class implement a `getBatchMany()` batch method
 *
 * @param TKey The type of a key item
 * @param TValue The type of a item inside the batched array return value
 */
export interface HasBatchedGetMany<TKey = string, TValue = unknown> {
  /**
   * Batch function that return an array of batched values per key
   */
  getBatchMany: BatchLoadFn<TKey, TValue[]>;
}
