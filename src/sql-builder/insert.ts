import {
  SQL,
  SQLStatement,
} from "sql-template-strings";

import {
  toCamelCase,
  toSnakeCase,
} from "./../utils";
import { combine } from "./combine";

export interface IData { [col: string]: any; } // tslint:disable-line: no-any

export interface IArgs {
  tableName: string;
  data: IData[];
}

export const insert = (args: IArgs): SQLStatement => {
  const sql = SQL``;
  const tableName = args.tableName;
  const columnNames = tableColumnNames(args.data);
  const insertColumns = columnNames.join(", ");
  const insertStatements = recordValues(args.data, columnNames);
  const insertValues = combine({ statements: insertStatements, separator: "," });

  sql.append(`INSERT INTO ${tableName} (${insertColumns}) VALUES `).append(insertValues);

  return sql;
};

const tableColumnNames = (data: IData[]) => {
  const objectKeys = Object.keys(data[0]);
  const snakeCasedKeys = objectKeys.map(toSnakeCase);

  return snakeCasedKeys;
};

const recordValues = (data: IData[], dbColumnNames: string[]): SQLStatement[] => {
  const records = data.map((o: IData) => {
    const values: SQLStatement[] = dbColumnNames.map(pluck.bind(undefined, o));
    const joinedValue = combine({ statements: values, separator: "," });

    return SQL`(`.append(joinedValue).append(SQL`)`);
  });

  return records;
};

const pluck = (obj: IData, key: string) => SQL`${obj[toCamelCase(key)]}`;
