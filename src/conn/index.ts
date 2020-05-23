import * as pg from "pg";

import { query } from "./query";
import { returningClause } from "./returning-clause";
import { IQueryArgs } from "./types";

export const conn = (dbConfig: pg.ClientConfig) => {
  const pool = new pg.Pool(dbConfig);

  return {
    pool,
    query: <T>(args: IQueryArgs): Promise<T> => query({ ...args, pool, dbUser: dbConfig.user }),
    insert: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...args, pool, dbUser: dbConfig.user }),
    update: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...args, pool, dbUser: dbConfig.user }),
    delete: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...args, pool, dbUser: dbConfig.user }),
  };
};
