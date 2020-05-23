import * as pg from "pg";

import { query } from "./query";
import { IQueryArgs } from "./types";

export const returningClause = async <T>(args: IQueryArgs & { pool: pg.Pool; dbUser?: string }): Promise<T> => {
  args.sql.append(" RETURNING * ");

  return query(args);
};
