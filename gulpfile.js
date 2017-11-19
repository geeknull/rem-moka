var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

function buildJS () {
  gulp.src('./src/rem-moka.js')
    .pipe(uglify())
    .pipe(rename('rem-moka.min.js'))
    .pipe(gulp.dest('./src'));
}

gulp.task('server', function () {
  browserSync.init({
    port: 9998,
    server: {
      baseDir: "./",
      index: './demo/index.html'
    }
  });
});

gulp.task('build', function () {
  buildJS();
});

gulp.task('default', ['server'], function () {
  gulp.watch("./src/rem-moka.js").on('change', function () {
    buildJS();
    browserSync.reload();
  });

  gulp.watch("./demo/*.html").on('change', function () {
    browserSync.reload();
  });
});
