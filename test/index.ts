import langs from "./langs/index";
import I18n from "../src/index";
import { LanguageType } from "@js-lion/i18n";

const i18n = I18n<typeof langs[LanguageType.en]>();
i18n.append(langs);

console.log(i18n.test.name);
console.log(i18n.message.CREATED_SUCCESSFULLY);
console.log(i18n.rule(i18n.common.placeholder.input, "name"));


