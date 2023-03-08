import I18n, { LanguageType } from "../src/index";

const i18n = I18n();

console.log(i18n.message.CREATED_SUCCESSFULLY);
console.log(i18n.message.SURE_TO_DELETE);

console.log(i18n.template(i18n.message.InputForLabel, { label: "name" }))

console.log(i18n.part(i18n.common.money, 2, { number: 1 }));
