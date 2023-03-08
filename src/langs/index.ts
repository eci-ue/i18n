import { LanguageType } from "../type";
import CN from "./cn/index";
import EN from "./en/index";

export type Language = typeof CN;

const value = {
  [LanguageType.cn]: CN,
  [LanguageType.en]: EN,
};
export default value;