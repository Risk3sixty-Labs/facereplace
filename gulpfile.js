const gulp = require('gulp')
const babel = require('gulp-babel')
const insert = require('gulp-insert')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify-es').default
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

gulp.task('src', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./dist"))
})

gulp.task('transpile', function() {
  return gulp.src("./src/bin/*.js")
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(uglify().on('error', console.log))
    .pipe(gulp.dest("./dist/bin"))
})

gulp.task('index', function() {
  return gulp.src("./dist/bin/facereplace")
    .pipe(insert.prepend("#!/usr/bin/env node\n\n"))
    .pipe(gulp.dest("./dist/bin"))
})

gulp.task('build', gulp.parallel('src'))
gulp.task('bin', gulp.series('transpile', 'index'))