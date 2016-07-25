var gulp = require('gulp'),
    sass = require('gulp-sass'), // compiles sass to CSS
    cleanCSS = require('gulp-clean-css'), // minifies CSS
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), // minifies JS
    rename = require('gulp-rename'),
    merge = require('merge-stream');

var paths = {
    'dev': {
        'scss': './_sass/'
    },
    'public': {
        'css': './css/',
        'js': './js/'
    },
    'vendor': {
        'bower': './bower_components/'
    }
};

// --- TASKS
// Generate CSS App file
gulp.task('app.css', function() {
  // place code for your default task here
  return gulp.src(paths.dev.scss+'*.scss')
      .pipe(sass({
          includePaths: [
              paths.vendor.bower+'bootstrap/scss',
              paths.vendor.bower+'font-awesome'
          ]
      }))
      .pipe(cleanCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.public.css));
});
// Generate Js App File
gulp.task('app.js', function(){
  return gulp.src([
        paths.vendor.bower+'jquery/dist/jquery.min.js',
        paths.vendor.bower+'bootstrap-sass/assets/javascripts/bootstrap.min.js',
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public.js));
});
