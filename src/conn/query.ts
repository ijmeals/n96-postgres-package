import * as pg from "pg";
import { SQL, SQLStatement } from "sql-template-strings";

import { logSlowQuery } from "./helpers/log-slow-query";
import { IOptionalArgs } from "./types";

export interface IArgs extends IOptionalArgs {
  sql: SQLStatement;
  tag: string;
  client?: pg.PoolClient;
}

export const query = async <T>(args: IArgs & { pool: pg.Pool; dbUser?: string }): Promise<T> => {
  const dbConnection = await establishConnection(args);
  const sql = SQL``.append(addTags(args)).append(args.sql);

  try {
    const startTime = +new Date();
    const result = await dbConnection.query(sql);
    const endTime = +new Date();

    if (args.logSlowQueries) {
      const logger = args.logSlowQueries.logger || console.warn.bind(this); // tslint:disable-line: no-console
      const ifExceeds = args.logSlowQueries.ifRunsLoggerThan;
      logSlowQuery({ sql, startTime, endTime, logger, ifExceeds });
    }

    return result.rows as {} as T;
  } finally {
    dbConnection.release();
  }
};

const establishConnection = async (args: IArgs & { pool: pg.Pool }) =>
  args.client ? args.client : args.pool.connect();

const addTags = (args: IArgs & { dbUser?: string }) => SQL`
  -- User: `.append(args.dbUser || "UNKNOWN").append(SQL`
  -- Tag: `).append(args.tag).append(SQL`
`);
