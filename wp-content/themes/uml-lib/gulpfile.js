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
var del = require( 'del' );

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
    return gulp.src( paths.sass + 'style.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.root))        // Output (style.css) on theme root

        .pipe(rtlcss())                     // Convert to RTL
        .pipe(rename({ basename: 'rtl' }))  // Rename to rtl.css
        .pipe(gulp.dest(paths.root));        // Output RTL stylesheets (rtl.css) on theme root
});

// JS Assembly task , check with jshint
// Run:
// gulp js
gulp.task('js', function() {
    var scripts = [
        // Bootstrap and popper combo
        paths.dev + 'js/vendor/bootstrap4/bootstrap.bundle.js',

        //Underscores js
        paths.dev + 'js/underscores/skip-link-focus-fix.js',

        //Custom js
        paths.dev + 'js/custom/custom.js',
    ];

    var process =
    gulp.src(scripts)
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat(paths.jsname))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));

    gulp.src(scripts)
        .pipe(concat(paths.jsname) )
        .pipe(gulp.dest(paths.js) );

    return process;
});

// Copy assets from node_modules to theme src/js, /scss and /fonts folder
// Run:
// gulp copy-assets
gulp.task( 'copy-assets', function() {
    var stream =

    // Copy jQuery JS Core
    gulp.src( paths.node + 'jquery/dist/core.js' )
        .pipe( gulp.dest( paths.dev + 'js/vendor' ) );

    // Copy Popper JS files
    gulp.src( paths.node + 'popper.js/dist/umd/popper.js' )
        .pipe( gulp.dest( paths.dev + 'js/vendor' ) );

    // Copy Bootstrap JS files
    gulp.src( paths.node + 'bootstrap/dist/js/**/*.js' )
        .pipe( gulp.dest( paths.dev + '/js/vendor/bootstrap4' ) );

    // Copy all Bootstrap SCSS files
    gulp.src( paths.node + 'bootstrap/scss/**/*.scss' )
        .pipe( gulp.dest( paths.sass + 'bootstrap4' ) );

    // Copy all Font Awesome Fonts
    gulp.src( paths.node + '@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eot,svg}' )
        .pipe( gulp.dest( paths.fonts ) );

    // Copy all Font Awesome SCSS files
    gulp.src( paths.node + '@fortawesome/fontawesome-free/scss/*.scss' )
        .pipe( gulp.dest( paths.sass + '/fontawesome' ) );

    // Copy Animate CSS
    gulp.src( paths.node + 'animate.css/animate.min.css' )
        .pipe( gulp.dest( paths.root + '/css' ) );

    return stream;
});

// Watch
// Run:
// gulp watch
gulp.task('watch', function() {
    browserSync.init( cfg.browserSyncWatchFiles, cfg.browserSyncOptions );

    gulp.watch( paths.sass + '**/*.scss', gulp.parallel('sass'))
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


// Delete any file inside the /bundle folder
// Run:
// gulp clean
gulp.task( 'clean', function() {
    return del( [paths.dist + '/**', '!./bundle'] );
});

// Duplicate directory contents minus dev files
// Run:
//gulp duplicate
gulp.task( 'duplicate', function() {
    var files = ['**/*',  '!./node_modules', '!./node_modules/**', '!./src', '!./src/**', '!./bundle', '!./bundle/**',  '!./sass', '!./sass/**', '!README.md', '!package.json', '!package-lock.json', '!gulpfile.js', '!gulpconfig.json', '!jshintrc', '!LICENSE'];

    return gulp.src(files)
        .pipe(gulp.dest(paths.dist));
});

//Bundle as simple theme
// Run:
// gulp bundle
gulp.task('bundle', gulp.parallel('clean', 'duplicate'));


// default task
gulp.task('default', gulp.series('sass', 'js', 'watch', function () {
    //some code
}));