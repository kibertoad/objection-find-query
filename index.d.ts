/* Type definitions for objection-find-query-builder */
/* Version 1.9.0 */
/* Definitions by: Paul Hart https://github.com/valtari1h */

export interface Builder {
	/**
	 * @function
	 * @param {string} field
	 * @param value
	 * @returns {Builder}
	 */
	equal(field: string, value: any): Builder;

	/**
	 * Retrieve specified relationships for the found entity eagerly
	 *
	 * @function
	 * @param {string} relationships
	 * @returns {Builder}
	 */
	eager(relationships: string[]): Builder;

	/**
	 * Retrieves entries where the specified field is in the given set of values
	 *
	 * @function
	 * @param {string} field
	 * @param {string[]} values
	 * @returns {Builder}
	 */
	inSet(field: string, values: string[]): Builder;

	/**
	 *  Retrieves entries that have any of the specified fields matching specified value with optional wildcards
	 *
	 * @function
	 * @param {string[]} fields - Fields for search that will be combined by OR operator
	 * @param {string} value - Value to search for. Supports wildcards, e. g. `'%Gump%'` or `'%ump'`
	 * @returns {Builder}
	 */
	anyLike(fields: string[], value: string): Builder;

	/**
	 * Retrieves entries that have any of the specified fields matching specified value with optional wildcards
	 * case insensitively
	 *
	 * @function
	 * @param {string[]} fields - Fields for search that will be combined by OR operator
	 * @param {string} value - Value to search for. Supports wildcards, e. g. `'%Gump%'` or `'%ump'`
	 * @returns {Builder}
	 */
	anyLikeLower(fields: string[], value: string): Builder;

	/**
	 * Group the result set by the unique values of the specified entry fields
	 *
	 * @function
	 * @param {string[]} fields
	 * @returns {Builder}
	 */
	groupBy(fields: string[]): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @param value
	 * @returns {Builder}
	 */
	greaterThan(field: string, value: any): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @param value
	 * @returns {Builder}
	 */
	greaterThanOrEqual(field: string, value: any): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @param value
	 * @returns {Builder}
	 */
	lessThan(field: string, value: any): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @param value
	 * @returns {Builder}
	 */
	lessThanOrEqual(field: string, value: any): Builder;

	/**
	 * Specifies the beginning boundary of the result set
	 *
	 * @function
	 * @param {number} value
	 * @returns {Builder}
	 */
	rangeStart(value: number): Builder;

	/**
	 * Specifies the ending boundary of the result set
	 *
	 * @function
	 * @param {number} value
	 * @returns {Builder}
	 */
	rangeEnd(value: number): Builder;

	/**
	 * Count the unique values of the specified fields.
	 * The result set must be previously grouped by all the fields passed as parameters to this function
	 *
	 * @function
	 * @param {string[]} fields
	 * @returns {Builder}
	 */
	count(fields: string[]): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @returns {Builder}
	 */
	orderByAsc(field: string): Builder;

	/**
	 * @function
	 * @param {string} field
	 * @returns {Builder}
	 */
	orderByDesc(field: string): Builder;

	/**
	 * Builds the query into a plain object
	 *
	 * @function
	 * @param {string} prefix - Optional query parameter prefix for readability
	 * @returns {object}
	 */
	build(prefix?: string): object;
}

/**
 * Creates a new instance of object-find-query-builder
 *
 * @function
 * @returns {Builder}
 */
export function builder(): Builder;

/**
 * @namespace
 */
export namespace eagerUtils {
	/**
	 * @function
	 * @param {string} eager
	 * @returns {string[]}
	 */
	export function getElements(eager: string): string[];

	/**
	 * Adds additional eager relationships to existing relationship string
	 *
	 * @function
	 * @param {string} eager - Existing `eager` relationship string
	 * @param {string[]} newParams - Eager relationships to add to the eager string
	 */
	export function appendToEagerParam(eager: string, newParams: string[]): string;

	/**
	 * @function
	 * @param {string} eager - Existing `eager` relationship string
	 * @param {string[]} removeParams - Eager relationships to remove from the eager string
	 * @returns {string}
	 */
	export function removeFromEagerParam(eager: string, removeParams: string[]): string;
}

/**
 * @namespace
 */
export namespace formatter {
	/**
	 * Generates query params from given parameter tree (see README.md for format details)
	 *
	 * @function
	 * @param {object} fieldTree
	 * @param {string} prefix
	 * @returns {object}
	 */
	export function format(fieldTree: object, prefix: string): object;
}
