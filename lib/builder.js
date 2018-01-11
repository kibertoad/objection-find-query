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

	in(paramName, paramValues) {
		this._getOperatorBranch('in')[paramName] = paramValues;
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
	 * @private
	 */
	_getOperatorBranch(operator) {
		if (!this._params[operator]) {
			this._params[operator] = {};
		}
		return this._params[operator];
	}

	build(prefix, wrapInBrackets) {
		return formatter.format(this._params, prefix, wrapInBrackets)
	}

}

module.exports = Builder;
