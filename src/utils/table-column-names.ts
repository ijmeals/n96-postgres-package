import { IData } from "./../types";
import { toSnakeCase } from "./to-snake-case";

export const tableColumnNames = (data: IData[]) => {
  const objectKeys = Object.keys(data[0]);
  const snakeCasedKeys = objectKeys.map(toSnakeCase);

  return snakeCasedKeys;
};
