/**
 * Gulp
 */
var gulp = require('gulp');
var pkg = require('./package.json');

/**
 * Gulp Plugins
 */
var plugins = require('gulp-load-plugins')();
var gutil = plugins.loadUtils(['env', 'log']);

/**
 * Log whether run in production or development
 */
var production = gutil.env.production;
var type = production ? 'production' : 'development';
gutil.log('Building for ' + type);

/**
 * Runs default gulp tasks upon 'gulp'
 */
gulp.task('default', ['startDB', 'serve']);

/**
 * Runs JSHint linter on scripts
 */
gulp.task('lint', function(){
  return gulp
    .src(pkg.paths.src.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
});

/**
 * Starts Node server for dev environment
 */
gulp.task('serve', function(){
  plugins.nodemon({
    script: 'server.js'
  });
});

/**
 * Starts MongoDB for dev environment
 */
gulp.task('startDB', function(){
  return gulp
    .src('')
    .pipe(plugins.shell(['mongod']));
});