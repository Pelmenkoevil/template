var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');

gulp.task('pug', function(done) {
  gulp.src('app/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .on('end', done);
});

gulp.task('default', ['watch']);
gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('sass', function(){
  return gulp.src('app/sass/*.+(sass|scss)')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync',function(){
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js'// Берем jQuery
           ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',['browser-sync', 'sass', 'pug'], function(){
  gulp.watch('app/pug/*.pug', ['pug']);
  gulp.watch('app/sass/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
