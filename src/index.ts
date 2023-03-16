/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import I18n from "./lib/i18n";
import I18nGet from "./lib/get";
import { LanguageType } from "./type";
import type { Language as I18nLanguage } from "./langs/index";

export { LanguageType };
export type Language = I18n & I18nLanguage;
export default function<T = Language>(language?: string | LanguageType): T {
  const i18n = new I18n(language);
  return I18nGet(i18n) as T;
};