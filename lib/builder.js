const formatter = require('./formatter');

class Builder {
	constructor() {
		this._params = {};
	}

	greaterThan(paramName, paramValue) {
		this._getOperatorBranch('gt')[paramName] = paramValue;
		return this;
	}

	lessThan(paramName, paramValue) {
		this._getOperatorBranch('lt')[paramName] = paramValue;
		return this;
	}

	greaterThanOrEqual(paramName, paramValue) {
		this._getOperatorBranch('gte')[paramName] = paramValue;
		return this;
	}

	lessThanOrEqual(paramName, paramValue) {
		this._getOperatorBranch('lte')[paramName] = paramValue;
		return this;
	}

	equal(paramName, paramValue) {
		this._getOperatorBranch('eq')[paramName] = paramValue;
		return this;
	}

	/**
	 * Value is in the given set of values
	 * @param {string} paramName
	 * @param {string[]} valueSet
	 * @returns {Builder}
	 */
	inSet(paramName, valueSet) {
		this._getOperatorBranch('in')[paramName] = valueSet.join(',');
		return this;
	}

	/**
	 * Retrieves entries that have any of the specified fields matching specified value with optional wildcards
	 * @param {string[]} paramNames - fields for search that will be combined by OR operator
	 * @param {string} value - value to search for. Supports wildcards, e. g. '%Gump%' or '%ump'
	 * * @returns {Builder}
	 */
	anyLike(paramNames, value) {
		this._params.anyLike = {
			paramNames,
			value
		};

		return this;
	}

	/**
	 * Retrieves entries that have any of the specified fields matching specified value with optional wildcards - case insensitively
	 * @param {string[]} paramNames - fields for search that will be combined by OR operator
	 * @param {string} value - value to search for. Supports wildcards, e. g. '%Gump%' or '%ump'
	 * * @returns {Builder}
	 */
	anyLikeLower(paramNames, value) {
		this._params.anyLikeLower = {
			paramNames,
			value
		};

		return this;
	}

	/**
	 * Retrieve specified relationships for the found entity eagerly
	 * {string[]} @param relationships
	 */
	eager(relationships) {
		this._params.eager = relationships;
		return this;
	}

	/**
	 * Specifies the beginning boundary of the result set
	 * {integer} @param number
	 */
	rangeStart(number) {
		this._params.rangeStart = number;
		return this;
	}

	/**
	 * Specifies the ending boundary of the result set
	 * {integer} @param number
	 */
	rangeEnd(number) {
		this._params.rangeEnd = number;
		return this;
	}

	/**
	 * Group the result set by the unique values of the specified fields
	 * {string[]} @param fields
	 */
	groupBy(fields) {
		this._params.groupBy = Array.isArray(fields) ? fields.join(',') : fields;
		return this;
	}

	/**
	 * Count the unique values of the specified fields.
	 * The result set must be previously grouped by all the fields passed as parameters to this function
	 * {string[]} @param fields
	 */
	count(fields) {
		this._params.count = Array.isArray(fields) ? fields.join(',') : fields;
		return this;
	}

	orderByAsc(paramName) {
		this._params.orderBy = {
			direction: 'asc',
			paramName
		};

		return this;
	}

	orderByDesc(paramName) {
		this._params.orderBy = {
			direction: 'desc',
			paramName
		};

		return this;
	}

	/**
	 * @private
	 */
	_getOperatorBranch(operator) {
		if (!this._params[operator]) {
			this._params[operator] = {};
		}

		return this._params[operator];
	}

	build(prefix) {
		return formatter.format(this._params, prefix);
	}
}

module.exports = Builder;
