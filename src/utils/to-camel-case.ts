import {
  lowercaseFirstLetter,
  uppercaseFirstLetter,
} from "./strings";

export const toCamelCase = (s: string) => {
  const sParts = s.trim().split("_");
  const upperCases = sParts.map(transformWord);
  const camelCase = upperCases.join("");

  return camelCase;
};

const transformWord = (v: string, i: number) => {
  if (i === 0) return lowercaseFirstLetter(v);

  return uppercaseFirstLetter(v);
};
