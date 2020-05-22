# INSERT ON CONFLICT

There is an assumption being made with `insertOnConflict` and that is either (a) you want to ignore the changes in which to "DO NOTHING" or (b) you want to update all changed, non-unique, values.

For a more pleasant developer experience, the array of objects can have keys that are camel case and they will be transformed into snake case. The keys do **need to match** the name of the columns in the table.

## Example Code for Updating Changed Values

```typescript
import { sqlBuilder } from "n96-postgres";

const obj = {
  tableName: "test_tbl",
  data: [
    {
      unique: "1",
      colOne: "first",
      colTwo: "second",
    },
    {
      unique: "2",
      colOne: "third",
      colTwo: "fourth",
    },
  ],
  do: "UPDATE",
  conflictColumns: ["unique"],
};

const query: SQLStatement = sqlBuilder.insertOnConflict(obj); // returns a prepared statement

// query.text === "INSERT INTO test_tbl (unique, col_one, col_two) VALUES ($1 , $2 , $3) , ($4 , $5 , $6) ON CONFLICT (unique) DO UPDATE col_one = EXCLUDED.col_one , col_two = EXCLUDED.col_two)"
```

## Example Code for Leaving Records Unchanged

```typescript
import { sqlBuilder } from "n96-postgres";

const obj = {
  tableName: "test_tbl",
  data: [
    {
      unique: "1",
      colOne: "first",
      colTwo: "second",
    },
    {
      unique: "2",
      colOne: "third",
      colTwo: "fourth",
    },
  ],
  do: "NOTHING",
  conflictColumns: ["unique"],
};

const query: SQLStatement = sqlBuilder.insertOnConflict(obj); // returns a prepared statement

// query.text === "INSERT INTO test_tbl (unique, col_one, col_two) VALUES ($1 , $2 , $3) , ($4 , $5 , $6) ON CONFLICT (unique) DO NOTHING"
```
