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
    this._getOperatorBranch('in')[paramName] = valueSet;
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
   * Retrieve specified relationships for the found entity eagerly
   * {string[]} @param relationships
   */
  eager(relationships) {
    this._params.eager = relationships;
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

  build(prefix, wrapInBrackets) {
    return formatter.format(this._params, prefix, wrapInBrackets);
  }
}

module.exports = Builder;
