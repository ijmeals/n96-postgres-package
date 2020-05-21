import {
  SQL,
  SQLStatement,
} from "sql-template-strings";

export interface IArgs {
  statements: SQLStatement[];
  separator: "," | "AND" | "OR";
}

export const combine = (args: IArgs) => {
  const sql =  SQL``;
  const total = args.statements.length;
  const separator = args.separator;

  args.statements.forEach((statement: SQLStatement, i: number) => {
    isFinalLoop(i, total) ? sql.append(statement) : sql.append(statement).append(` ${separator} `);
  });

  return sql;
};

const isFinalLoop = (i: number, total: number) => (i + 1) === total;
