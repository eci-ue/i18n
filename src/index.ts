/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import { I18n, LanguageType } from "@js-lion/i18n";
import LanguageValues from "./langs/index";
import { Language } from "./langs/index";

export { LanguageType };
export type { Language };

export default function<T>(language?: string) {
  const i18n = I18n<T & Language>(language);
  i18n.append(LanguageValues);
  return i18n;
}