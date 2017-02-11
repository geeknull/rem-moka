var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.src('./src/rem-moka.js')
    .pipe(uglify())
    .pipe(rename('rem-moka.min.js'))
    .pipe(gulp.dest('./src'));
});