const fs = require("fs");
const path = require("path");
const xlsx = require('node-xlsx').default;
const Export = require("./script/export");
const Import = require("./script/import");

const getLangs = function(dir) {
  const data = require(dir);
  return data.default ? data.default : data;
}

const tool = { 
  Export: Export.default ? Export.default : Export, 
  Import: Import.default ? Import.default : Import
};

module.exports = {
  Export: function(langDir, exportDir, title) {
    const value = getLangs(langDir);
    const content = tool.Export(value);
    let src;
    const name = path.basename(exportDir);
    if (/\.xlsx?$/i.test(name)) {
      src = exportDir;
    } else {
      src = path.posix.join(path.posix.normalize(exportDir), `langs_${Date.now()}.xlsx`);
    }
    try {
      const buffer = xlsx.build([
        {
          name: title || "中英文文案",
          data: content
        }
      ]);
      fs.writeFileSync(src, buffer);
      console.log("Exported %s Language(s).", content.length - 1);
      return src;
    } catch (error) {
      throw error;
    }
  }
}