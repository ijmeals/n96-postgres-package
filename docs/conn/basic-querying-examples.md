# Basic Querying Examples

## Basic SELECT Type Query

```TypeScript
import { conn, SQL } from "n96-postgres";
const db = conn(connectionProps);

interface IQueryResult {
  colNum: number;
}

const data = await dbConn.query<IQueryResult[]>({
  tag: "SELECTing data example"
  sql: SQL`SELECT 1 AS col_num`,
});

// data[0].colNumber === 1
```

The SQL query, from the example above, that is ran against the database would look like:

```SQL
-- User: <this value is based off the db user passed into conn()>
-- Tag: SELECTing data example
SELECT 1 AS col_num
```

The `tag` property is to provide insight as to where in the code base this query originates from. A helpful way, especially when noticing long running queries in the `pg_stat_activity` table. It is also useful to see what "user" is running this query. Is it a developer that ran this from their local machine, or is it coming from a live STAGING or PRODUCTION environment.

## INSERT, UPDATE, DELETE Type Query

`conn` also has `insert`, `update`, and `delete` functions. These three functions provide two things. The first is in the code, it provides some additional clarity as to what the query is doing. The second thing it provides is it appends the `RETURNING CLAUSE` to the query so that the created / modified records are automatically returned.

Here is an example:

```TypeScript
import { conn, SQL } from "n96-postgres";
const db = conn(connectionProps);

interface IQueryResult {
  col: number;
}

const data = await dbConn.insert<IQueryResult[]>({
  tag: "INSERTing data example"
  sql: SQL`INSERT INTO tbl_name (col) VALUES (${val})`,
});
```

The SQL query, from the example above, that is ran against the database would look like:

```SQL
-- User: <this value is based off the db user passed into conn()>
-- Tag: INSERTing data example
INSERT INTO test_tbl (col) VALUES ($1) RETURNING *
```
