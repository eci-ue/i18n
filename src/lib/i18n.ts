/**
 * @file i18n
 * @author svon.me@gmail.com
 */

import * as cookie from "./cookie";
import Langs from "../langs/index";
import { template } from "./template";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

export default class I18n {
  public values: object = {};
  constructor(language?: string) {
    this.setLanguage(language);
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
  hasLanguage(language?: string) {
    if (language && safeGet(this.values, language)) {
      return true;
    }
    return false;
  }
  getLanguage () {
    return cookie.get();
  }
  setLanguage (language?: string) {
    if (language && this.hasLanguage(language)) {
      cookie.set(language);
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