require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});

let exportDir = process.argv[2];
const path = require("path");
const Message = require("../script");

const langs = path.posix.resolve(__dirname, "..", "src/langs");


if (!exportDir) {
  exportDir = path.resolve(__dirname, "..");
}

try {
  if (exportDir) {
    const src = Message.Export(langs, exportDir);
    console.log(`export file = %s.`, src);
  }
} catch (error) {
  console.log(error);
}

