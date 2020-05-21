# n96 Postgres Package

This is primarily built around the NPM package [pg](https://www.npmjs.com/package/pg). It also utilizes [sql-template-strings](https://www.npmjs.com/package/sql-template-strings).

## Postgres Naming Convention (snake case)

This is important because there are baked in assumptions when using this package.

Table names and column names are assumed to be in snake case and in all lower cases (e.g. table_names, col_name). Due to postgres being case insensitive, this is my preferred naming convention for identifiers within Postgres.

If you are using this package and don't strictly follow snake casing when it comes to identifers there might be some limitations such as using helper functions within the `sqlBuilder` module.

## SQL Injection

I am exported the 

## Install and Importing Package

To install the package, within the project directory, run:

```terminal
npm i n96-postgres --save
```

To import in project

```typescript
import * as anythingYouLike from "n96-postgres";

// or

import { sqlBuilder } from "n96-postgres";
```

## SQL Builder

There are cases where it is nice to have some help when constructing a SQL statement, such as when you have an array of objects that you want inserted into a table.

### Insert Statement

Example Code:

```typescript
import { sqlBuilder } from "n96-postgres";

const obj = {
    tableName: "test_tbl",
    data: [
      {
        colOne: "first",
        colTwo: "second",
      },
      {
        colOne: "third",
        colTwo: "fourth",
      },
    ],
  };

const query: SQLStatement = sqlBuilder.insert(obj); // returns a prepared statement

// query.text === "INSERT INTO test_tbl (col_one, col_two) VALUES ($1 , $2) , ($3 , $4)"
```

For a more pleasant developer experience, the array of objects can have keys that are camel case and they will be transformed into snake case. The keys do **need to match** the name of the columns in the table.

### Combine SQL Statements

This is useful when having a set of conditionals that make up all or part of the WHERE clause.

Example Code:

```typescript
import { sqlBuilder, SQL } from "n96-postgres";

const statements = new Array();

if (conditionIsTrue) whereClause.push(SQL`col1 = ${val})`)
if (conditionIsFalse) whereClause.push(SQL`col2 = ${val})`)
if (conditionIsTrue) whereClause.push(SQL`col3 = ${val})`)

const where: SQLStatement = sqlBuilder.combine({ statements, separator: "AND" });
const sql: SQLStatement = SQL`SELECT * FROM tbl WHERE `.append(where);
```
