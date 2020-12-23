import { uppercaseFirstLetter } from "./uppercase-first-letter";

export const splitByUppercase = (s: string) => {
  s = uppercaseFirstLetter(s);
  const sParts = splitByUppercases(s);

  return sParts;
};

const splitByUppercases= (s: string) => s.match(/[A-Z][a-z]+/g) as string[];
