var gulp = require('gulp'),
    sass = require('gulp-sass'), // compiles sass to CSS
    minify = require('gulp-minify-css'), // minifies CSS
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), // minifies JS
    rename = require('gulp-rename');

    var paths = {
        'dev': {
            'sass': './_sass/'
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
  return gulp.src(paths.dev.sass+'*.scss')
      .pipe(sass({
          includePaths: [
              paths.vendor.bower+'foundation/scss',
              paths.vendor.bower+'foundation-icon-fonts'
          ]
      }))
      .pipe(minify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.public.css));
});

// Generate Js App File
gulp.task('app.js', function(){
  return gulp.src([
        paths.vendor.bower+'jquery/dist/jquery.min.js',
        paths.vendor.bower+'foundation/js/foundation.min.js',
        paths.vendor.bower+'fastclick/lib/fastclick.js',
        paths.vendor.bower+'modernizr/modernizr.js',
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public.js));
});
