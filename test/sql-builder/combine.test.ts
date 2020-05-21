import { SQL } from "sql-template-strings";

import { combine } from "./../../src/sql-builder/combine";

test("that the sql statements join properly", () => {
  const statements = [
    SQL`col1 = 'val1'`,
    SQL`col2 = 'val2'`,
    SQL`col3 = 'val3'`,
  ];
  const separator = "AND";
  const expectedValue = "col1 = 'val1' AND col2 = 'val2' AND col3 = 'val3'";
  const actualValue = combine({ separator, statements });

  expect(actualValue.text).toBe(expectedValue);
});
