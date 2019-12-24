const gulp = require('gulp')
const babel = require('gulp-babel')
const insert = require('gulp-insert')
const plumber = require('gulp-plumber')

gulp.task('src', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./dist"))
})

gulp.task('bin', function() {
  return gulp.src("./dist/bin/facereplace.js")
    .pipe(insert.prepend("#!/usr/bin/env node\n\n"))
    .pipe(gulp.dest("./dist/bin"))
})

gulp.task('build', gulp.series('src', 'bin'))
