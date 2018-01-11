const formatter = require('./lib/formatter');
const Builder = require('./lib/builder');

/**
 * @returns {Builder}
 */
function builder() {
	return new Builder();
}

module.exports = {
	format: formatter.format,
	builder
};
