import langs from "./langs/index";
import I18n, { LanguageType } from "../src/index";

const i18n = I18n<typeof langs[LanguageType.en]>();
i18n.append(langs);

console.log(i18n.test.name);


console.log(i18n.message.CREATED_SUCCESSFULLY);


console.log(i18n.template(i18n.message.InputForLabel, { label: "name" }))

