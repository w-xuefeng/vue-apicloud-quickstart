module.exports = api => {
  api.registerCommand('generate', args => {
    const { generateConfig, buildConfig } = require('../config')
    const { generate, resolve } = require('../utils')
    const { indexHTML, configXML, target, targetZip, files } = generateConfig;
    const FROME = resolve(api, buildConfig.outputDir);
    const INDEXFILE = resolve(api, indexHTML);
    const CONFIGXML = resolve(api, configXML);
    const TO = resolve(api, target);
    const TOZIP = resolve(api, targetZip);
    const OtherFiles = files;
    const config = { api, FROME, TO, OtherFiles, target, CONFIGXML, INDEXFILE, outputDir: buildConfig.outputDir, TOZIP, rebuild: buildConfig.rebuild }
    generate(config);
  });
}