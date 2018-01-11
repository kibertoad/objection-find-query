## objection-find-query

Based on original work by AFM Sayem - https://github.com/afm-sayem/objection-find-query

Construct complex api query on the frontend, for endpoints implementing [objection-find](https://github.com/Vincit/objection-find).


Usage:

## Manual formatting

```javascript

/*
  expected format:
  {
    op: {
      column: value
    }
  }

  sample input:
  {
    gt: {
      released: 1953,
      gross_income: 200000,
      actors: {
        age: 23
      }
    },
    lt: {
      released: 1984
    },
    in: {
      ratings: [3, 4]
    }
  }

  output:
  {
    'released:gt': 1953,
    'gross_income:gt': 200000,
    'actors.age:gt': 23,
    'released:lt': 1984,
    'ratings:in': [3, 4]
  }
*/

const queryBuilder = require('objection-find-query-builder');
const formattedParams = queryBuilder.format(params);

```

## Builder

```

const queryBuilder = require('objection-find-query-builder');

const builder = queryBuilder.builder();
const formattedParams = builder.greaterThan('field', 1).lessThan('field', 3).build();

```

## Installation

`npm install objection-find-query-builder`
