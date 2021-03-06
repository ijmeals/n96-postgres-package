import { SQL } from "sql-template-strings";

import { IData } from "./../types";
import {
  tableColumnNames,
} from "./../utils";
import { combine } from "./combine";
import {
  IArgs as IInsertArgs,
  insert,
} from "./insert";

export interface IArgs extends IInsertArgs {
  do: "UPDATE" | "NOTHING";
  conflictColumns: string[];
}

export const insertOnConflict = (args: IArgs) => {
  const baseQuery = insert(args);

  baseQuery.append(` ON CONFLICT (${args.conflictColumns.join(",")}) DO ${args.do}`);

  if (args.do === "UPDATE") baseQuery.append(updateStatement(args.data, args.conflictColumns));

  return baseQuery;
};

const updateStatement = (data: IData[], conflictColumns: string[]) => {
  const allColumns = tableColumnNames(data);
  const updateColumns = allColumns.filter((insertColumn: string) => !conflictColumns.includes(insertColumn));
  const statements = updateColumns.map((col: string) => SQL``.append(`${col} = EXCLUDED.${col}`));

  return SQL` SET `.append(combine({ statements, separator: ","}));
};

const removeConflictColumns = (conflictColumns: string[], insertColumn: string) =>
  !conflictColumns.includes(insertColumn);
