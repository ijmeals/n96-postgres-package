# How to Log Slow Queries

There are two ways I have found to be useful for keeping an eye out for slow performing queries.

1. pg_stat_statements (done on the DB side)
2. monitoring how long the query takes to run (using this package)

## pg_stat_statements

`pg_stat_statements` is what is known as a contrib **extension**, found in the contrib directory of a PostgreSQL distribution. This means it already ships with Postgres and you don't have to go and build it from source or install packages.

If you run on a cloud provider there is a strong likelihood it is installed and enabled.

_You may have to enable it for your database if it is not already enabled. This is as simple as:_

```SQL
CREATE EXTENSION pg_stat_statements;
```

After it is enabled, you can query the view using the following query:

```SQL
SELECT * FROM pg_stat_statements;
```

> It doesn’t save each individual query, rather it parametrizes them and then saves the aggregated result

### Sources

- https://www.postgresql.org/docs/12/pgstatstatements.html
- https://www.citusdata.com/blog/2019/02/08/the-most-useful-postgres-extension-pg-stat-statements/

## Using this Package

The one advantage I have found by logging slow queries is the ability to grab the parameters, as mentioned above `pg_stat_statements` does not save each query and also parametrizes them.

For instance, when querying the `pg_stat_statements` view you will see queries like:

```SQL
SELECT * FROM tbl WHERE col = ?
```

There are times that a query is slow under certain parameters but not others, and by logging the actual specific query, can reduce the spelunking and investigation.

To log slow queries using this package, n96 Postgres Package, there are two ways. One is by setting the configuration when you initally call the `conn` function, and the other is to do it on a query by query basis.

What I like to do is set it up so all queries that exceed a certain amount of time, and then on a case by case basis change that time if I know that query is always going to trigger my ideal baseline.

### Setting up Logging Initially

To enable logging for all queries if the exceed a certain threshold, the code would look like this:

```TypeScript
import { conn, SQL } from "n96-postgres";

const db = conn(connectionProps, {
  logSlowQueries: {
      ifRunsLoggerThan: 3, // number of seconds, you can also do floats (e.g. 0.01 seconds)
  }});
```

`logSlowQueries` has one required property, which is the maximum time before logging. The other is an optional property, `logger`. By default, it will use `console.warn`, however you can pass in any logging method you want from your preferred logger.

Here is an example of how that would look:

```TypeScript
import { conn, SQL } from "n96-postgres";
import pino from "pino";
const logger = pino();

const db = conn(connectionProps, {
  logSlowQueries: {
      ifRunsLoggerThan: 3, // number of seconds, you can also do floats (e.g. 0.01 seconds)
      logger: logger.warn,
  }});
```

### Logging by Individual Query

If you want to change the logging settings from what was set when first calling `conn(...)`, or you prefer not to log at all except in one call, you can pass in the `logSlowQueries` into as a second argument.

Here is an example of that:

```TypeScript
const data = await dbConn.query<IQueryResult[]>({
  tag: "SELECTing data example"
  sql: SQL`SELECT 1 AS col_num`,
}, {
  logSlowQueries: {
      ifRunsLoggerThan: 3, // number of seconds, you can also do floats (e.g. 0.01 seconds)
      logger: console.warn,
  }
});
```

_if you setup logging when first calling `conn(...)`, and included a logger function, you do not need to pass it again unless you want to override what you originally passed into `conn`.

### What is Logged

The message of the log will be "SLOW-QUERY" and will log the following params:

1. the total time the query took to run
2. the text version of the query (e.g. `SELECT * FROM tbl WHERE col = ?`)
3. the parametrize of the query (e.g. [2])

### Disable n96 Postgres Logging Locally

If you want to disable any logging of slow queries when working locally without having to modify any code, add an environment variable "N96_POSTGRES_DISABLE_LOGGING" and set it to false.
