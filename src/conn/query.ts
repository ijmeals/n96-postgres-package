import * as pg from "pg";
import { SQL } from "sql-template-strings";

import {
  camelCaseColumnNames,
  logSlowQuery,
} from "./helpers";
import { IQueryArgs } from "./types";

export const query = async <T>(args: IQueryArgs & { pool: pg.Pool; dbUser?: string }): Promise<T> => {
  const dbConnection = await establishConnection(args);
  const sql = SQL``.append(addTags(args)).append(args.sql);

  try {
    if (args.schema) await dbConnection.query(SQL`SET search_path TO ${args.schema}`);

    const startTime = +new Date();
    const result = await dbConnection.query(sql);
    const endTime = +new Date();

    if (args.logSlowQueries) {
      const logger = args.logSlowQueries.logger || console.warn.bind(this); // tslint:disable-line: no-console
      const ifExceeds = args.logSlowQueries.ifRunsLoggerThan;
      logSlowQuery({ sql, startTime, endTime, logger, ifExceeds });
    }

    return result.rows.map(camelCaseColumnNames) as {} as T;
  } finally {
    if (!args.client) dbConnection.release();
  }
};

const establishConnection = async (args: IQueryArgs & { pool: pg.Pool }) =>
  args.client ? args.client : args.pool.connect();

const addTags = (args: IQueryArgs & { dbUser?: string }) => SQL`
  -- User: `.append(args.dbUser || "UNKNOWN").append(SQL`
  -- Tag: `).append(args.tag).append(SQL`
`);
