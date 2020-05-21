import { toSnakeCase } from "./../../src/utils/to-snake-case";

test("camel case is transformed to snake case", () => {
  const camelCase = "dbColName";
  const expectedValue = "db_col_name";
  const actualValue = toSnakeCase(camelCase);

  expect(actualValue).toBe(expectedValue);
});

test("when it is one word and starts with an uppercase", () => {
  const camelCase = "Isaac";
  const expectedValue = "isaac";
  const actualValue = toSnakeCase(camelCase);

  expect(actualValue).toBe(expectedValue);
});
