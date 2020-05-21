import { IArgs as IInsertObj, insert } from "./../../src/sql-builder/insert";

test("that the insert statement is properly constructed", () => {
  const obj: IInsertObj = {
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
  const expectedSql = "INSERT INTO test_tbl (col_one, col_two) VALUES ($1 , $2) , ($3 , $4)";
  const actualValue = insert(obj);

  expect(actualValue.text).toBe(expectedSql);
  expect(actualValue.values[0]).toBe("first");
  expect(actualValue.values[1]).toBe("second");
});
