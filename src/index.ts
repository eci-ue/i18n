/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import I18n from "./lib/i18n";
import I18nGet from "./lib/get";
import * as cookie from "./lib/cookie";
import { LanguageType } from "./type";
import { Language as I18nLanguage } from "./langs/index";

export { LanguageType };
export type Language = I18n & I18nLanguage;

export default function<T = Language>(language?: string | LanguageType): T {
  if (!language) {
    language = cookie.get();
  }
  const i18n = new I18n();
  if (i18n.hasLanguage(language)) {
    i18n.setLanguage(language);
  } else {
    i18n.setLanguage(LanguageType.auto);
  }
  return I18nGet(i18n) as T;
};