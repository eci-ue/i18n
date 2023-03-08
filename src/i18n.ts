import { template } from "./template";
import { LanguageType } from "./type";
import safeGet from "@fengqiaogang/safe-get";
import Langs, { Language as type } from "./langs/index";

class I18nTemplate {
  constructor(
    private language: LanguageType = LanguageType.auto
  ) {
    // todo
  }
  getLanguage (): LanguageType {
    return this.language;
  }
  setLanguage (language: string | LanguageType) {
    if (has(language as LanguageType)) {
      this.language = language as LanguageType;
      const name = "i18n-Language";
      const expires = new Date(Date.now() + 365 * 864e5);
      const value = `${encodeURIComponent(name)}=${encodeURIComponent(language)}; path=/; expires=${expires.toUTCString()};`;
      document.cookie = value;
      return true;
    }
    return false;
  }
  template (tpl: string, value?: object): string {
    return template(tpl, value || {});
  }
  part (value: string = "", index?: number | object, data?: object) {
    if (typeof index === "object") {
      data = index as object;
      index = 0;
    }
    index = Number(index);
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0) {
      index = 0;
    }
    const array: string[] = String(value || "").split("|").map((text) => text.trim());
    if (index >= array.length) {
      index = array.length - 1;
    }
    const text = array[index];
    return this.template(text, data);
  }
}

export type Language = I18nTemplate & type;

const has = function(language: LanguageType = LanguageType.auto): boolean {
  if (language) {
    const value = Langs[language];
    return value ? true : false;
  }
  return false;
}


const I18nProxy: any = function(i18n: I18nTemplate) {
  let self: I18nTemplate;
  const template = function (code: string): string {
    let [key, data = "{}"] = code.replace(/^[a-z]+\(|\);?$/ig, "").split(",").map((text: string) => text.trim());
    if (/^i18n/i.test(key)) {
      key = key.replace(/^i18n\./i, "");
    }
    const text = safeGet<string>(self, key);
    if (text) {
      try {
        return i18n.template(text, eval(`(${data})`));
      } catch (error) {
        // todo
      }
    }
    return "";
  }
  const part = function (code: string): string {
    let [key, index = "", data = "{}"] = code.replace(/^[a-z]+\(|\);?$/ig, "").split(",").map((text: string) => text.trim());
    if (/^i18n/i.test(key)) {
      key = key.replace(/^i18n\./i, "");
    }
    const text = safeGet<string>(self, key);
    if (text) {
      try {
        if (/^\d+$/.test(index)) {
          return i18n.part(text, Number(index), eval(`(${data})`));
        }
        return i18n.part(text, 0, eval(`(${data})`));
      } catch (error) {
        // todo
      }
    }
    return "";
  }
  const app = function(data: any) {
    const get: any = function(target: I18nTemplate, prop: string) {
      let value;
      if (target instanceof I18nTemplate) {
        if (safeGet(target, prop)) {
          return safeGet(target, prop);
        }
        const langs = Langs[target.getLanguage()];
        value = safeGet(langs, prop);
      } else {
        value = safeGet(target, prop);
      }
      if (value && typeof value === "string") {
        if (/template\(/.test(value)) {
          return template(value.trim());
        }
        if (/part\(/.test(value)) {
          return part(value.trim());
        }
        return value;
      }
      if (value && typeof value === "object") {
        return app(value);
      }
    };
    return new Proxy(data, { get });
  }
  self = app(i18n);
  return self;
}



export const I18n = function(language?: string | LanguageType): Language {
  if (!language) {
    const [, type = ""] = document.cookie.match(/i18n-Language=(\S+)/) || [];
    if (type) {
      language = type;
    } else {
      language = LanguageType.auto;
    }
  }
  const i18n = new I18nTemplate();
  if (has(language as LanguageType)) {
    i18n.setLanguage(language);
  } else {
    i18n.setLanguage(LanguageType.auto);
  }
  const value = I18nProxy(i18n);
  return value as Language;
}