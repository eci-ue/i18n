import { template } from "./template";
import { LanguageType } from "./type";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import Langs, { Language as I18nLanguage } from "./langs/index";

class I18nTemplate {
  public values: object = {};
  constructor(private language: LanguageType = LanguageType.auto) {
    const app = (data: object, path: string[] = []) => {
      for (const key of Object.keys(data)) {
        const value = safeGet<any>(data, key);
        if (value && typeof value === "object") {
          app(value, [...path, key]);
        } else {
          safeSet(this.values, [...path, key], value);
        }
      }
    }
    app(Langs);
  }
  hasLanguage(language: string | LanguageType) {
    if (safeGet(this.values, language)) {
      return true;
    }
    return false;
  }
  getLanguage (): LanguageType {
    return this.language;
  }
  setLanguage (language: string | LanguageType) {
    if (this.hasLanguage(language)) {
      this.language = language as LanguageType;
      const name = "i18n-Language";
      const expires = new Date(Date.now() + 365 * 864e5);
      const value = `${encodeURIComponent(name)}=${encodeURIComponent(language)}; path=/; expires=${expires.toUTCString()};`;
      document.cookie = value;
      return true;
    }
    return false;
  }
  append(langValue: object) {
    const app = (data: object, path: string[] = []) => {
      for (const key of Object.keys(data)) {
        const value = safeGet<any>(data, key);
        if (value && typeof value === "object") {
          app(value, [...path, key]);
        } else {
          safeSet(this.values, [...path, key], value);
        }
      }
    }
    app(langValue);
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
  get(key: string | string[]) {
    return safeGet(this.values, [this.getLanguage()].concat(key as any));
  }
}

const toJSON = function(value: string = "{}"): object {
  // eval(`(${value})`)
  const text = value.replace(/(\s*[a-z0-9]+\s?:)/ig, function($1: string, $2: string) {
    const key = $2.trim().replace(":", "").replace(/\s+/g, "");
    return ` "${key}": `;
  });
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    return {};
  }
}

export type Language = I18nTemplate & I18nLanguage;

const I18nProxy: any = function(i18n: I18nTemplate) {
  let self: I18nTemplate;
  const template = function (code: string): string {
    code = code.replace(/^[a-z]+\(|\);?$/ig, "");
    const index = code.indexOf(",");
    let key = code.slice(0, index).trim();
    const data = code.slice(index + 1).trim();
    if (/^i18n/i.test(key)) {
      key = key.replace(/^i18n\./i, "");
    }
    const text = safeGet<string>(self, key);
    if (text) {
      try {
        return i18n.template(text, toJSON(data));
      } catch (error) {
        // todo
      }
    }
    return "";
  }
  const part = function (code: string): string {
    code = code.replace(/^[a-z]+\(|\);?$/ig, "");
    let key = code.slice(0, code.indexOf(",") + 1);
    const temp = code.slice(key.length);
    let index = temp.slice(0, temp.indexOf(","));
    let data: string;
    if (index && /^\d+$/g.test(index.trim())) {
      data = temp.slice(index.length + 1);
    } else {
      index = "0";
      data = temp;
    }
    key = key.replace(/,/g, "").trim();
    index = index.replace(/,/g, "").trim();
    data = data.trim();
    if (/^i18n/i.test(key)) {
      key = key.replace(/^i18n\./i, "");
    }
    const text = safeGet<string>(self, key);
    if (text) {
      try {
        if (/^\d+$/.test(index)) {
          return i18n.part(text, Number(index), toJSON(data));
        }
        return i18n.part(text, 0, toJSON(data));
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
        value = safeGet(i18n.values, [target.getLanguage(), prop]);
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



export const I18n = function<T>(language?: string | LanguageType): T & Language {
  if (!language) {
    const [, type = ""] = document.cookie.match(/i18n-Language=(\S+)/) || [];
    if (type) {
      language = type;
    } else {
      language = LanguageType.auto;
    }
  }
  const i18n = new I18nTemplate();
  if (i18n.hasLanguage(language)) {
    i18n.setLanguage(language);
  } else {
    i18n.setLanguage(LanguageType.auto);
  }
  const value = I18nProxy(i18n);
  return value;
}