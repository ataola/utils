// Karma configuration
// Generated on Sat Apr 10 2021 00:13:46 GMT+0800 (中国标准时间)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'webpack'],

    // list of files / patterns to load in the browser
    files: ['lib/**/*.js', 'test/**/*.js'],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 匹配源文件，并使用 webpack 进行预处理
      'lib/**/*.js': ['webpack', 'coverage'],
      // 匹配测试文件，并使用 webpack 进行预处理
      'test/**/*.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    // https://github.com/litixsoft/karma-mocha-reporter
    reporters: ['mocha', 'coverage'],
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      symbols: {
        success: '+',
        info: '#',
        warning: '!',
        error: 'x'
      },
      output: 'autowatch',
      showDiff: true,
      divider: ''
    },
    coverageReporter: {
      // 生成报告的目录
      dir: 'coverage/',
      // 要生成的报告类型
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !!process.env.CI,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            // 匹配 JavaScript 文件
            test: /\.js$/,
            // 排除 node_modules 目录
            exclude: /node_modules/,
            use: {
              // 使用的 loader
              loader: 'babel-loader',
              // 传递给 babel-loader 的参数
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['istanbul']
              }
            }
          }
        ]
      }
    }
  });
};
