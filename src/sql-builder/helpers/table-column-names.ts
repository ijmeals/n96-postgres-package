import { toSnakeCase } from "./../../utils";
import { IData } from "./../types";

export const tableColumnNames = (data: IData[]) => {
  const objectKeys = Object.keys(data[0]);
  const snakeCasedKeys = objectKeys.map(toSnakeCase);

  return snakeCasedKeys;
};
