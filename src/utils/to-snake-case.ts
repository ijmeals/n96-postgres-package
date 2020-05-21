import { lowercaseFirstLetter, splitByUppercase } from "./strings";

export const toSnakeCase = (s: string) => {
  const sParts = splitByUppercase(s);
  const lowerCaseParts = sParts.map(lowercaseFirstLetter);
  const snakeCase = lowerCaseParts.join("_");

  return snakeCase;
};
