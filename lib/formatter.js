function format(paramValues, prefix, wrapInBrackets) {
	const params = compact(paramValues);
	const paramObj = {};
	for (let op in params) {
		if (params.hasOwnProperty(op)) {
			switch (op) {
				case 'eager':
					if (Array.isArray(paramValues.eager)) {
						paramObj.eager = `[${paramValues.eager.join()}]`;
					} else {
						paramObj.eager = paramValues.eager;
					}
					break;

				case 'groupBy':
					if (Array.isArray(paramValues.groupBy)) {
						paramObj.groupBy = `[${paramValues.groupBy.join()}]`;
					} else {
						paramObj.groupBy = paramValues.groupBy;
					}
					break;

				case 'count':
					if (Array.isArray(paramValues.count)) {
						paramObj.count = `[${paramValues.count.join()}]`;
					} else {
						paramObj.count = paramValues.count;
					}
					break;

				case 'orderBy':
					const orderFieldName =
						paramValues.orderBy.direction === 'desc' ? 'orderByDesc' : 'orderBy';
					paramObj[orderFieldName] = paramValues.orderBy.paramName;
					break;

				case 'anyLike':
					if (!Array.isArray(paramValues.anyLike.paramNames)) {
						paramValues.anyLike.paramNames = [paramValues.anyLike.paramNames];
					}
					const anyLikeFieldName = `${paramValues.anyLike.paramNames.join('|')}:like`;
					paramObj[anyLikeFieldName] = paramValues.anyLike.value;
					break;

				case 'anyLikeLower':
					if (!Array.isArray(paramValues.anyLikeLower.paramNames)) {
						paramValues.anyLikeLower.paramNames = [paramValues.anyLikeLower.paramNames];
					}
					const anyLikeLowerFieldName = `${paramValues.anyLikeLower.paramNames.join('|')}:likeLower`;
					paramObj[anyLikeLowerFieldName] = paramValues.anyLikeLower.value;
					break;

				default:
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
			let transformedData = Array.isArray(data[key]) ? `[${data[key].join()}]` : data[key];
			if (wrapInBrackets) {
				filterObj[prefix + '[' + key + ':' + op + ']'] = transformedData;
			} else {
				filterObj[prefix + key + ':' + op] = transformedData;
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
			keys.forEach(function (key) {
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
