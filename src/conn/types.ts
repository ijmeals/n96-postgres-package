import { PoolClient } from "pg";
import { SQLStatement } from "sql-template-strings";

export type Logger = (msg: string, params: any) => void; // tslint:disable-line: no-any
export type Seconds = number;

export interface IOptionalArgs {
  logSlowQueries?: {
    ifRunsLoggerThan: Seconds;
    logger?: Logger;
  };
}

export interface IQueryArgs extends IOptionalArgs {
  sql: SQLStatement;
  tag: string;
  client?: PoolClient;
}
