import {
  SQL,
  SQLStatement,
} from "sql-template-strings";

import { combine } from "./combine";
import {
  pluck,
  tableColumnNames,
} from "./helpers";
import { IData } from "./types";

export interface IArgs {
  tableName: string;
  data: IData[];
}

export const insert = (args: IArgs): SQLStatement => {
  const sql = SQL``;
  const tableName = args.tableName;
  const columnNames = tableColumnNames(args.data);
  const insertColumns = columnNames.join(", ");
  const insertStatements = insertRecords(columnNames, args.data);
  const insertValues = combine({ statements: insertStatements, separator: "," });

  sql.append(`INSERT INTO ${tableName} (${insertColumns}) VALUES `).append(insertValues);

  return sql;
};

const insertRecords = (columnNames: string[], data: IData[]): SQLStatement[] =>
  data.map(insertRecord.bind(undefined, columnNames));

const insertRecord = (columnNames: string[], obj: IData): SQLStatement => {
  const values: SQLStatement[] = columnNames.map(pluck.bind(undefined, obj));
  const joinedValue = combine({ statements: values, separator: "," });

  return SQL`(`.append(joinedValue).append(SQL`)`);
};
