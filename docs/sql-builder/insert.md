# INSERT

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
