import { SQLStatement } from "sql-template-strings";

import { Logger, Seconds } from "./../types";

export interface IArgs {
  startTime: number;
  endTime: number;
  logger: Logger;
  ifExceeds: Seconds;
  sql: SQLStatement;
}

const MILLISECOND_IN_SECOND = 10000;

export const logSlowQuery = (args: IArgs) => {
  const totalTime = executionTime(args.startTime, args.endTime);
  if (isLoggingDisabled() || totalTime < args.ifExceeds) return;

  const obj = {
    query: args.sql.text,
    queryValues: args.sql.values,
    totalTime,
  };

  args.logger("SLOW-QUERY", obj);
};

const executionTime = (startTime: number, endTime: number) =>
  (endTime - startTime) / MILLISECOND_IN_SECOND;

const isLoggingDisabled = () => Boolean(process.env.N96_POSTGRES_DISABLE_LOGGING);
