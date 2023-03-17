/**
 * @file 导出双语文件
 * @author svon.me@gmail.com
 */

const getResult = require("./result");

/**
 * 导出双语文件
 * @param langs 双语文件
 * @param exportDir 导出目录
 */
const Export = function(langs) {
  const table = getResult(langs);
  // const list = table.map(function(item: string[]) {
  //   return item.join(",\t")
  // });
  // return list.join("\n");
  return table;
};

module.exports = Export;