import { LanguageType } from "../type";

const name = "i18n-Language";

let cache: string;
let language: LanguageType = LanguageType.auto;

export const get = function(): LanguageType {
  const value = document.cookie;
  if (cache && cache !== value) {
    cache = value;
    const reg = new RegExp(`${name}=(\\S+)`, "i");
    const [, type = ""] = value.match(reg) || [];
    if (type) {
      language = type as LanguageType;
    }
  }
  return language;
}

export const set = function(value: string | LanguageType): void {
  if (value) {
    if (get() === String(value)) {
      return;
    }
    const expires = new Date(Date.now() + 365 * 864e5);
    const data = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = data;
  }
}

