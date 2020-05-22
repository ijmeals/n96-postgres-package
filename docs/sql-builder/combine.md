# Combing SQL Statements

This is useful when having a set of conditionals that make up all or part of the WHERE clause.

## Example Code

```typescript
import { sqlBuilder, SQL } from "n96-postgres";

const statements = new Array();

if (conditionIsTrue) whereClause.push(SQL`col1 = ${val})`)
if (conditionIsFalse) whereClause.push(SQL`col2 = ${val})`)
if (conditionIsTrue) whereClause.push(SQL`col3 = ${val})`)

const where: SQLStatement = sqlBuilder.combine({ statements, separator: "AND" });
const sql: SQLStatement = SQL`SELECT * FROM tbl WHERE `.append(where);
```
