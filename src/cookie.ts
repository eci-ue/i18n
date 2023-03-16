import { LanguageType } from "./type";

const name = "i18n-Language";

export const get = function(): LanguageType {
  const reg = new RegExp(`${name}=(\\S+)`, "i");
  const [, type = ""] = document.cookie.match(reg) || [];
  if (type) {
    return type as LanguageType;
  }
  return LanguageType.auto;
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

