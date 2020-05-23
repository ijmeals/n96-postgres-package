import { SQL } from "sql-template-strings";

import { toSnakeCase } from "./../utils";
import { combine } from "./combine";
import { tableColumnNames } from "./helpers";
import {
  IArgs as IInsertArgs,
  insert,
} from "./insert";
import { IData } from "./types";

export interface IArgs extends IInsertArgs {
  do: "UPDATE" | "NOTHING";
  conflictColumns: string[];
}

export const insertOnConflict = (args: IArgs) => {
  const baseQuery = insert(args);
  const conflictColumns = args.conflictColumns.map(toSnakeCase);

  baseQuery.append(` ON CONFLICT (${conflictColumns.join(",")}) DO ${args.do}`);

  if (args.do === "UPDATE") baseQuery.append(updateStatement(args.data, conflictColumns));

  return baseQuery;
};

const updateStatement = (data: IData[], conflictColumns: string[]) => {
  const allColumns = tableColumnNames(data);
  const updateColumns = allColumns.filter(removeConflictColumns.bind(undefined, conflictColumns));
  const statements = updateColumns.map((col: string) => SQL``.append(`${col} = EXCLUDED.${col}`));

  return SQL` `.append(combine({ statements, separator: ","}));
};

const removeConflictColumns = (insertColumn: string, conflictColumns: string[]) =>
  !conflictColumns.includes(insertColumn);
