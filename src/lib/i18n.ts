import { en } from "@/messages/en";

type Dict = { readonly [key: string]: string | readonly string[] | Dict };

/** Resolve a dotted key such as "spaces.living". Throws in development when a key is missing. */
export function getMessage(key: string): string {
  const found = key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object" && part in (node as Dict)) {
      return (node as Dict)[part];
    }
    return undefined;
  }, en as Dict);

  if (typeof found !== "string") {
    throw new Error(`Missing message key: ${key}`);
  }
  return found;
}

export const t = en;
