const formatter = require('./lib/formatter');
const Builder = require('./lib/builder');
const eagerUtils = require('./lib/eager.utils');

/**
 * @returns {Builder}
 */
function builder() {
	return new Builder();
}

module.exports = {
	format: formatter.format,
	eagerUtils,
	builder
};
