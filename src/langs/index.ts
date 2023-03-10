import { LanguageType } from "../type";
import * as CN from "./cn/index";
import * as EN from "./en/index";

export type Language = typeof CN;

const value = {
  [LanguageType.cn]: CN,
  [LanguageType.en]: EN,
};
export default value;