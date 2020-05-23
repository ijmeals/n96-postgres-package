# n96 Postgres Package

This is primarily built around the NPM package [pg](https://www.npmjs.com/package/pg). It also utilizes [sql-template-strings](https://www.npmjs.com/package/sql-template-strings).

This package is useful, primarily, when wanting to write raw SQL instead of using an ORM or some sort of query builder like Knex.js, and is sort of my version to the more popular package [slonik](https://www.npmjs.com/package/slonik).

Objectives of this package:

1. Helpers to construct tedious queries (i.e. multiple record inserts, on conflicts, combining SQL Statements)
2. Pre-written queries that can be ran to gain insight on the health of the database (e.g. find unused indexes, dead tuples, blocking queries)
3. Handle connections, timeouts, log slow queries, return data with camel case keys, return records that have been inserts / updates without needing to do `RETURNING *`

## Postgres Naming Convention (snake case)

This is important because there are baked in assumptions when using this package.

Table names and column names are assumed to be in snake case and in all lower cases (e.g. table_names, col_name). Due to postgres being case insensitive, this is my preferred naming convention for identifiers within Postgres.

If you are using this package and don't strictly follow snake casing when it comes to identifers there might be some limitations such as using helper functions within the `sqlBuilder` module.

## Install and Importing Package

To install the package, within the project directory, run:

```terminal
npm i n96-postgres --save
```

To import in project

```typescript
import * as anythingYouLike from "n96-postgres";

// or

import { conn, sqlBuilder } from "n96-postgres";
```

## SQL Builder

There are cases where it is nice to have some help when constructing a SQL statement, such as when you have an array of objects that you want inserted into a table.

- [insert](./docs/sql-builder/insert.md)
- [insert on conflict](./docs/sql-builder/insert-on-conflict.md)
- [combining an array of SQL statements](./docs/sql-builder/combine.md)

## Conn (short for connection)

This module is use to query the database.
