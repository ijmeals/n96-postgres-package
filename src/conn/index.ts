import * as pg from "pg";
import { SQLStatement } from "sql-template-strings";

import { IArgs as IQueryArgs, query } from "./query";
import { IOptionalArgs } from "./types";

export const conn = (dbConfig: pg.ClientConfig, settings?: IOptionalArgs) => {
  const pool = new pg.Pool(dbConfig);

  return {
    pool,
    query: <T>(args: IQueryArgs): Promise<T> => query({ ...args, pool, dbUser: dbConfig.user }),
  };
};
