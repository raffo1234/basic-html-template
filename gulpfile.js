var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var config = {
    sassFiles: './assets/css/styles.scss',
    allCssFiles: ['./assets/css/*.scss', './assets/css/**/*.scss', './assets/css/*.css', './assets/css/**/*.css'],
    fontFiles: ['./assets/fonts/**/*'],
    destDir: './dist/'
};

gulp.task('styles', function() {
    gulp.src([config.sassFiles])
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename({
          basename: "app",
          suffix: ".min",
          extname: ".css"
        }))
        .pipe(plugins.sourcemaps.write('../' + config.destDir))
        .pipe(gulp.dest(config.destDir))
});

gulp.task('fonts', function() {
  gulp.src(config.fontFiles)
    .pipe(plugins.filter(['*.ttf', '*.woff', '*.woff2', '*.otf', '*.svg', '*.eot']))
    .pipe(gulp.dest(config.destDir + 'vendors/fonts/'));
});

gulp.task('watch', function() {
  gulp.watch(config.allCssFiles, ['styles']);
  gulp.watch(config.fontFiles, ['fonts']);
});

gulp.task('default', ['styles', 'fonts', 'watch']);
