import {
  SQL,
  SQLStatement,
} from "sql-template-strings";

import { IData } from "./../types";
import { tableColumnNames } from "./../utils";
import { combine } from "./combine";
import { pluck } from "./helpers";

export interface IArgs {
  tableName: string;
  data: IData[];
}

export const insert = (args: IArgs): SQLStatement => {
  const sql = SQL``;
  const columnNames = tableColumnNames(args.data);
  const insertStatements = insertRecords(columnNames, args.data);
  const values = combine({ statements: insertStatements, separator: "," });

  sql.append(`INSERT INTO ${args.tableName} (${columnNames.join(", ")}) VALUES `).append(values);

  return sql;
};

const insertRecords = (columnNames: string[], data: IData[]): SQLStatement[] =>
  data.map(insertRecord.bind(undefined, columnNames));

const insertRecord = (columnNames: string[], obj: IData): SQLStatement => {
  const values: SQLStatement[] = columnNames.map(pluck.bind(undefined, obj));
  const joinedValue = combine({ statements: values, separator: "," });

  return SQL`(`.append(joinedValue).append(SQL`)`);
};
