import * as pg from "pg";

import { query } from "./query";
import { returningClause } from "./returning-clause";
import {
  IOptionalArgs,
  IQueryArgs,
} from "./types";

export interface IConn {
  pool: pg.Pool;
  query<T>(args: IQueryArgs): Promise<T>;
  insert<T>(args: IQueryArgs): Promise<T>;
  update<T>(args: IQueryArgs): Promise<T>;
  delete<T>(args: IQueryArgs): Promise<T>;
}

export const conn = (dbConfig: pg.ClientConfig, opts?: IOptionalArgs): IConn => {
  const pool = new pg.Pool(dbConfig);
  const defaultQueryArgs = {
    ...opts,
    pool,
    dbUser: dbConfig.user,
  };

  return {
    pool,
    query: <T>(args: IQueryArgs): Promise<T> => query({ ...defaultQueryArgs, ...args }),
    insert: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...defaultQueryArgs, ...args }),
    update: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...defaultQueryArgs, ...args }),
    delete: <T>(args: IQueryArgs): Promise<T> => returningClause({ ...defaultQueryArgs, ...args }),
  };
};
