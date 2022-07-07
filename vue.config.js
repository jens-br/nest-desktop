const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { NewLineKind } = require('typescript');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/nest_desktop/app/'
    : ' process.env.NODE_ENV', // '.',
  productionSourceMap: false,
  transpileDependencies: ['vuetify'],
  outputDir: './nest_desktop/app',
  // https://stackoverflow.com/questions/55258355/vue-clis-type-checking-service-ignores-memory-limits#55810460
  // and https://cli.vuejs.org/config/#parallel
  configureWebpack: config => {
    // save the current ForkTsCheckerWebpackPlugin
    const existingForkTsChecker = config.plugins.filter(
      plugin => plugin instanceof ForkTsCheckerWebpackPlugin
    )[0];

    // remove it
    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof ForkTsCheckerWebpackPlugin)
    );

    // copy the options from the original ones, but modify memory and CPUs
    const newForkTsCheckerOptions = existingForkTsChecker.options;
    newForkTsCheckerOptions.memoryLimit = 8192;
    if (process.env.CI)
      newForkTsCheckerOptions.workers = require('os').cpus().length;
    else newForkTsCheckerOptions.workers = require('os').cpus().length - 1;
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin(newForkTsCheckerOptions)
    );
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'NEST Desktop';
      return args;
    });
  },
};
