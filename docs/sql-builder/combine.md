# Combing SQL Statements

This is useful when having a set of conditionals that make up all or part of the WHERE clause.

## Example Code

```typescript
import { sqlBuilder, SQL } from "n96-postgres";

const whereStatements = new Array();

if (expression) whereStatements.push(SQL`col1 = ${val})`)
if (expression) whereStatements.push(SQL`col2 = ${val})`)
if (expression) whereStatements.push(SQL`col3 = ${val})`)

const whereClause: SQLStatement = sqlBuilder.combine({
  statements: whereStatements,
  separator: "AND",
});
const sql: SQLStatement = SQL`SELECT * FROM tbl WHERE `.append(whereClause);
```
