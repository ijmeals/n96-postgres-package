import { uppercaseFirstLetter } from "./uppercase-first-letter";

export const splitByUppercase = (s: string) => {
  s = uppercaseFirstLetter(s);
  const sParts = split(s);

  return sParts;
};

const split = (s: string) => s.match(/[A-Z][a-z]+/g) as string[];
