const gulp = require('gulp')
const gutil = require('gulp-util');
const webpack = require('webpack-stream');
const vulcanize = require('gulp-vulcanize');
const ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
const runSequence = require('run-sequence');
const rename = require("gulp-rename");

gulp.task('default', function () {
  return gutil.log('Gulp is running!')
});


gulp.task('tsc-build', () => {
    var tsResult = gulp.src("src/**/*.ts",{base: "."}) 
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('.'));
});



gulp.task('tsc',() =>{
  return gulp.src('src/**/*.ts',{ base: "."})
        .pipe(ts({
            target: "es5",
            noImplicitAny: true,
        }))
        .pipe(gulp.dest('.'));
})

gulp.task('webpack', () => {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest("dist"))
});

gulp.task('moveStyle', () => {
  return gulp.src('style.css')
    .pipe(gulp.dest('dist'))
});

gulp.task('vulcanize', () => {
  return gulp.src('index.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(rename('index.vulcanized.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('build', function (done) {
  runSequence('tsc-build', 'moveStyle', 'webpack', 'vulcanize', function () {
    console.log('Build Completed');
    done();
  });
});
