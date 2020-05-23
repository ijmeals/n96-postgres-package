import { SQL } from "sql-template-strings";

import { IData } from "./../../types";
import { toCamelCase } from "./../../utils";

export const pluck = (obj: IData, key: string) => SQL`${obj[toCamelCase(key)]}`;
