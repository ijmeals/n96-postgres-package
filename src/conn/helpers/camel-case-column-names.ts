import { IData } from "./../../types";
import { toCamelCase } from "./../../utils";

export const camelCaseColumnNames = (data: IData) => {
  const obj = new Object();
  const columns = Object.keys(data);

  columns.forEach((col: string) => {
    obj[toCamelCase(col)] = data[col];
  });

  return obj;
};
