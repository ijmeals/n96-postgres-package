import { SQL } from "sql-template-strings";

import { toCamelCase } from "./../../utils";
import { IData } from "./../types";

export const pluck = (obj: IData, key: string) => SQL`${obj[toCamelCase(key)]}`;
