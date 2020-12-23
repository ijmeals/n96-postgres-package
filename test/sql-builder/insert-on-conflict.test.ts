import { IArgs, insertOnConflict } from "./../../src/sql-builder/insert-on-conflict";

test("on update", () => {
  const obj: IArgs = {
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
  const expectedSql = "INSERT INTO test_tbl (unique, col_one, col_two) VALUES ($1 , $2 , $3) , ($4 , $5 , $6) ON CONFLICT (unique) DO UPDATE col_one = EXCLUDED.col_one , col_two = EXCLUDED.col_two";
  const actualValue = insertOnConflict(obj);

  expect(actualValue.text).toBe(expectedSql);
});

test("on update", () => {
  const obj: IArgs = {
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
  const expectedSql = "INSERT INTO test_tbl (unique, col_one, col_two) VALUES ($1 , $2 , $3) , ($4 , $5 , $6) ON CONFLICT (unique) DO NOTHING";
  const actualValue = insertOnConflict(obj);

  expect(actualValue.text).toBe(expectedSql);
});


test("on update with snake_case_columns", () => {
  const obj: IArgs = {
    tableName: "test_tbl",
    data: [
      {
        uniqueCol: "1",
        colOne: "first",
        colTwo: "second",
      },
      {
        uniqueCol: "2",
        colOne: "third",
        colTwo: "fourth",
      },
    ],
    do: "UPDATE",
    conflictColumns: ["unique_col"],
  };
  const expectedSql = "INSERT INTO test_tbl (unique_col, col_one, col_two) VALUES ($1 , $2 , $3) , ($4 , $5 , $6) ON CONFLICT (unique_col) DO UPDATE col_one = EXCLUDED.col_one , col_two = EXCLUDED.col_two";
  const actualValue = insertOnConflict(obj);

  expect(actualValue.text).toBe(expectedSql);
});
