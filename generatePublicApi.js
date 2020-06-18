const fs = require('fs');
const path = require('path');
var folder = './projects/onka-angular-admin-core/src';
var exports = '';

function prepareFiles(dir) {
  console.log('prepareFiles', dir);
  var files = fs.readdirSync(dir);
  files.forEach((file) => {
    var filePath = dir + path.sep + file;
    var stat = fs.lstatSync(filePath);
    var parsed = path.parse(file);
    //console.log('parsed', dir, file);
    //console.log('parsed', parsed);
    if (stat.isFile() && filePath.indexOf('spec.ts') == -1 && ['.ts'].indexOf(parsed.ext) != -1) {
      filePath = filePath.replace(folder, '').replace(/\\/gim, '/').replace('.ts', '');
      exports += "export * from '." + filePath + "';\n";
      return;
    }
    if (stat.isDirectory()) prepareFiles(filePath);
  });
}
prepareFiles(folder + '/lib');
fs.writeFileSync(folder + '/public-api.ts', exports);
console.log(exports);
