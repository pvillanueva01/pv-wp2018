require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer  = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var rtlcss  = require('gulp-rtlcss');
var rename  = require('gulp-rename');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();
//var reload = browserSync.reload;

var onError = function (err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Configuration file to keep your code DRY
var cfg = require( './gulpconfig.json' );
var paths = cfg.paths;

// SASS task
// Run:
// gulp sass
gulp.task('sass', function() {
    return gulp.src( paths.sass + '/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.root))        // Output (style.css) on theme root

        .pipe(rtlcss())                     // Convert to RTL
        .pipe(rename({ basename: 'rtl' }))  // Rename to rtl.css
        .pipe(gulp.dest(paths.root));        // Output RTL stylesheets (rtl.css) on theme root
});

// JS task
// Run:
// gulp js
gulp.task('js', function() {
    return gulp.src(paths.jssrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(paths.jsname))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
});

// Watch
// Run:
// gulp watch
gulp.task('watch', function() {
    browserSync.init( cfg.browserSyncWatchFiles, cfg.browserSyncOptions );

    gulp.watch( paths.sass + '/*.scss', gulp.parallel('sass'))
        .on('change', function(path) {
            console.log('Changed: ' + path);
            // code to execute on change
        })
    gulp.watch(paths.jssrc , gulp.parallel('js'))
        .on('change', function(path) {
            console.log('Changed: ' + path);
            // code to execute on change
        })
});


// default task
gulp.task('default', gulp.series('sass', 'js', 'watch', function () {
    //some code
}));