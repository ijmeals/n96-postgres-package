import { toCamelCase } from "./../../src/utils/to-camel-case";

test("snake case is transformed to camel case", () => {
  const snakeCase = "db_col_name";
  const expectedValue = "dbColName";
  const actualValue = toCamelCase(snakeCase);

  expect(actualValue).toBe(expectedValue);
});

test("when it is not snake case", () => {
  const camelCase = "dbColName";
  const expectedValue = "dbColName";
  const actualValue = toCamelCase(camelCase);

  expect(actualValue).toBe(expectedValue);
});

test("when it is one word and starts with an uppercase", () => {
  const camelCase = "Name";
  const expectedValue = "name";
  const actualValue = toCamelCase(camelCase);

  expect(actualValue).toBe(expectedValue);
});
