const Builder = require('./builder');

function appendToEagerParam(eagerParam, newParams) {
	if (!Array.isArray(newParams)) {
		newParams = [newParams];
	}

	const params = getElements(eagerParam);
	params.push(...newParams);
	const builder = new Builder();
	return builder.eager(params).build().eager;
}

function removeFromEagerParam(eagerParam, removeParams) {
	if (!eagerParam) {
		eagerParam = '';
	}
	if (!Array.isArray(removeParams)) {
		removeParams = [removeParams];
	}

	const params = getElements(eagerParam)
		.filter(entry => {
			return !removeParams.includes(entry);
		});
	const builder = new Builder();
	return builder.eager(params).build().eager;
}

function getElements(eagerParam) {
	return eagerParam ? eagerParam
		.replace(/\[|]| /g, '')
		.split(',') : [];
}

module.exports = {
	appendToEagerParam,
	getElements,
	removeFromEagerParam
};
