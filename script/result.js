
const safeGet = require("@fengqiaogang/safe-get");
const LanguageType = require("../src/type.json");

const getKeys = function() {
  const list = [];
  for (const key of Object.keys(LanguageType)) {
    if (LanguageType[key] === LanguageType.auto) {
      continue;
    }
    list.push(LanguageType[key]);
  }
  return list;
}

const getResult = function(langs) {
  const keys = getKeys();
  const result = [
    [
      "Code", 
      String(LanguageType.auto).toLocaleUpperCase(), 
      ...keys.map((value) => value.toLocaleUpperCase())
    ]
  ];
  const read = function(data, path = []) {
    for (const key of Object.keys(data)) {
      const name = [...path, key];
      const value = safeGet(data, key);
      if (value && typeof value === "object") {
        read(value, name);
      } else {
        const item = [];
        item.push(name.join("."));
        item.push(value);
        for (const langType of keys) {
          const temp = safeGet(langs, [langType].concat(name));
          item.push(temp);
        }
        result.push(item.map(function(text) {
          if (text) {
            return text;
          }
          return "";
        }));
      }
    }
  }
  read(safeGet(langs, LanguageType.auto) || {}, []);
  return result;
}

module.exports = getResult;