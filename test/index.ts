import langs from "./langs/index";
import I18n, { LanguageType } from "../dist/i18n";
import type { Language } from "../src/index";

// @ts-ignore
const i18n = I18n<typeof langs[LanguageType.en] & Language>();
i18n.append(langs);

console.log(i18n.test.name);


console.log(i18n.message.CREATED_SUCCESSFULLY);


console.log(i18n.rule(i18n.common.placeholder.input, "name"));


