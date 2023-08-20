import { LanguageType } from "@js-lion/i18n";
import * as CN from "./cn/index";
import * as EN from "./en/index";

const value = {
  [LanguageType.cn]: CN,
  [LanguageType.en]: EN,
};
export default value;