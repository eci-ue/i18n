import { LanguageType } from "../../src/index";
import * as CN from "./cn/index";
import * as EN from "./en/index";

const value = {
  [LanguageType.cn]: CN,
  [LanguageType.en]: EN,
};
export default value;