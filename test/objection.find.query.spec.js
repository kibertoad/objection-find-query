const ofq = require('../index.js');
const data = require('./data.json');
const expected = require('./expected.json');

const prefix = 'where';

const assert = require('chai').assert;

describe('objection-find-query', () => {

	it('simple, brackets', () => {
		const result = ofq.format(data.simple, prefix, true);
		assert.deepEqual(expected.simple, result);
	});

	it('simple, no brackets, no prefix', () => {
		const result = ofq.format(data.simple, '', false);
		assert.deepEqual(expected.simple_no_brackets, result);
	});

	it('simple, no prefix', () => {
		const result = ofq.format(data.simple, '', true);
		assert.deepEqual(expected.simple_no_prefix, result);
	});

	it('composite', () => {
		const result = ofq.format(data.composite);
		assert.deepEqual(expected.composite, result);
	});

	it('multiple sibling', () => {
		const result = ofq.format(data.multiple_sibling);
		assert.deepEqual(expected.multiple_sibling, result);
	});

	it('array', () => {
		const result = ofq.format(data.array);
		assert.deepEqual(expected.array, result);
	});

	it('nested', () => {
		const result = ofq.format(data.nested);
		assert.deepEqual(expected.nested, result);
	});
});


