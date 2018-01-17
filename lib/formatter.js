function format(paramValues, prefix, wrapInBrackets) {
  const params = compact(paramValues);
  const paramObj = {};
  for (let op in params) {
    if (params.hasOwnProperty(op)) {
      if (op === 'eager') {
        if (Array.isArray(paramValues.eager)) {
          paramObj.eager = `[${paramValues.eager.join()}]`;
        } else {
          paramObj.eager = paramValues.eager;
        }
      } else if (op === 'orderBy') {
        const fieldName = paramValues.orderBy.direction === 'desc' ? 'orderByDesc' : 'orderBy';
        paramObj[fieldName] = paramValues.orderBy.paramName;
      } else {
        Object.assign(paramObj, getFilters(flatten(params[op]), op, prefix, wrapInBrackets));
      }
    }
  }
  return paramObj;
}

function getFilters(data, op, prefix, wrapInBrackets) {
  prefix = prefix || '';
  const filterObj = {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (wrapInBrackets) {
        filterObj[prefix + '[' + key + ':' + op + ']'] = data[key];
      } else {
        filterObj[prefix + key + ':' + op] = data[key];
      }
    }
  }

  return filterObj;
}

function compact(objectWithEmptyValues) {
  const obj = JSON.parse(JSON.stringify(objectWithEmptyValues));
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (obj[i] === undefined || obj[i] === null) {
        delete obj[i];
      } else if (typeof obj[i] === 'object' && !(obj[i] instanceof Array)) {
        compact(obj[i]);
      }
    }
  }
  return obj;
}

function flatten(obj) {
  const flatObj = {};

  function makeFlat(obj, path) {
    const keys = Array.isArray(obj) || typeof obj === 'string' ? false : Object.keys(obj);
    if (keys.length) {
      keys.forEach(function(key) {
        makeFlat(obj[key], (path ? path + '.' : path) + key);
      });
    } else {
      flatObj[path] = obj;
    }
  }

  makeFlat(obj, '');
  return flatObj;
}

module.exports = {
  format
};
