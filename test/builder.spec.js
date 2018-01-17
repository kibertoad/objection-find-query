const assert = require('chai').assert;
const objectionBuilder = require('../index');

describe('builder', () => {
  it('equal', () => {
    const builder = objectionBuilder.builder();
    const params = builder.equal('field', 'value').build();

    assert.deepEqual(
      {
        'field:eq': 'value'
      },
      params
    );
  });

  it('gt', () => {
    const builder = objectionBuilder.builder();
    const params = builder.greaterThan('field', 5).build();

    assert.deepEqual(
      {
        'field:gt': 5
      },
      params
    );
  });

  it('lt', () => {
    const builder = objectionBuilder.builder();
    const params = builder.lessThan('field', 6).build();

    assert.deepEqual(
      {
        'field:lt': 6
      },
      params
    );
  });

  it('gte', () => {
    const builder = objectionBuilder.builder();
    const params = builder.greaterThanOrEqual('field', 11).build();

    assert.deepEqual(
      {
        'field:gte': 11
      },
      params
    );
  });

  it('lte', () => {
    const builder = objectionBuilder.builder();
    const params = builder.lessThanOrEqual('field', 22).build();

    assert.deepEqual(
      {
        'field:lte': 22
      },
      params
    );
  });

  it('inSet', () => {
    const builder = objectionBuilder.builder();
    const params = builder.inSet('field', [4, 9]).build();

    assert.deepEqual(
      {
        'field:in': [4, 9]
      },
      params
    );
  });

  it('anyLike - multiple values', () => {
    const builder = objectionBuilder.builder();
    const params = builder.anyLike(['lastName', 'movies.name'], '%Gump%').build();

    assert.deepEqual(
      {
        'lastName|movies.name:like': '%Gump%'
      },
      params
    );
  });

  it('anyLike - single value array', () => {
    const builder = objectionBuilder.builder();
    const params = builder.anyLike(['lastName'], '%Gump%').build();

    assert.deepEqual(
      {
        'lastName:like': '%Gump%'
      },
      params
    );
  });

  it('anyLike - single value not array', () => {
    const builder = objectionBuilder.builder();
    const params = builder.anyLike('lastName', '%Gump%').build();

    assert.deepEqual(
      {
        'lastName:like': '%Gump%'
      },
      params
    );
  });

  it('single eager', () => {
    const builder = objectionBuilder.builder();
    const params = builder.eager('contacts').build();

    assert.deepEqual(
      {
        eager: 'contacts'
      },
      params
    );
  });

  it('single array eager', () => {
    const builder = objectionBuilder.builder();
    const params = builder.eager(['contacts']).build();

    assert.deepEqual(
      {
        eager: '[contacts]'
      },
      params
    );
  });

  it('multiple eager', () => {
    const builder = objectionBuilder.builder();
    const params = builder.eager(['contacts', 'address']).build();

    assert.deepEqual(
      {
        eager: '[contacts,address]'
      },
      params
    );
  });

  it('orderByAsc', () => {
    const builder = objectionBuilder.builder();
    const params = builder.orderByAsc('name').build();

    assert.deepEqual(
      {
        orderBy: 'name'
      },
      params
    );
  });

  it('orderByDesc', () => {
    const builder = objectionBuilder.builder();
    const params = builder.orderByDesc('name').build();

    assert.deepEqual(
      {
        orderByDesc: 'name'
      },
      params
    );
  });

  it('between', () => {
    const builder = objectionBuilder.builder();
    const params = builder
      .greaterThan('field', 1)
      .lessThan('field', 3)
      .build();

    assert.deepEqual(
      {
        'field:gt': 1,
        'field:lt': 3
      },
      params
    );
  });

  it('multiple', () => {
    const builder = objectionBuilder.builder();
    const params = builder
      .greaterThan('field', 1)
      .greaterThan('field2', 2)
      .build();

    assert.deepEqual(
      {
        'field:gt': 1,
        'field2:gt': 2
      },
      params
    );
  });
});
