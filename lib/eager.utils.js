const Builder = require('./builder');

function appendToEagerParam(eagerParam, newParams) {
	if (!Array.isArray(newParams)) {
		newParams = [newParams];
	}

	const params = eagerParam.replace(/\[|]| /g, '').split(',');
	params.push(...newParams);
	const builder = new Builder();
	return builder.eager(params).build().eager;
}

function removeFromEagerParam(eagerParam, removeParams) {
	if (!Array.isArray(removeParams)) {
		removeParams = [removeParams];
	}

	const params = eagerParam
		.replace(/\[|]| /g, '')
		.split(',')
		.filter(entry => {
			return !removeParams.includes(entry);
		});
	const builder = new Builder();
	return builder.eager(params).build().eager;
}

module.exports = {
	appendToEagerParam,
	removeFromEagerParam
};
