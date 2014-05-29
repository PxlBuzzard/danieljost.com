var Metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var sass = require('metalsmith-sass');
var autoprefixer = require('metalsmith-autoprefixer');
var watch = require('metalsmith-watch');

var metalsmith = Metalsmith(__dirname)

  .source('app')
  .destination('build')

  .use(templates({
    engine: 'nunjucks',
    directory: './'
  }))

  .use(sass({
    outputStyle: 'nested',
    includePaths: require('node-neat').includePaths
  }))

  .use(autoprefixer())

  .use(watch({
    pattern : '**/*',
    livereload: true
  }))

  .build();
