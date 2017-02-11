import gulp from 'gulp';
import less from 'gulp-less';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';
import maps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import del from 'del';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

browserSync.create();

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/main.less')
        .pipe(maps.init())
        .pipe(less())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Concat CSS


// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Concat Minify Browserify SourceMap JS 
gulp.task('minify-js', function() {
    return browserify('js/theme.js')
        .transform('babelify')
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(maps.init()) // create sourcemap
        .pipe(uglify()) // minify
        .pipe(maps.write('./')) // write sourcemap
        .pipe(gulp.dest('js'))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    return gulp.src([
        'node_modules/bootstrap/**',
        ])
    .pipe(gulp.dest('vendor/bootstrap')),

    gulp.src([
        'node_modules/font-awesome/**',
        ])
    .pipe(gulp.dest('vendor/font-awesome'))
});

// Copy fonts over
gulp.task('fonts', ['copy'], function(){
    return gulp.src([
        'vendor/bootstrap/fonts/**',
        'vendor/font-awesome/fonts/**'
        ])
    .pipe(gulp.dest('fonts'))
});

// Clean up task
gulp.task('clean', function(){
    del(['css/main.css'])
});

// Create dist folder
gulp.task('dist', ['clean'], function() {
    return gulp.src([
        'css/*.min.css*',
        'js/*.min.js*',
        'fonts/*',
        'index.html',
        'img/**'],
        { base: './' })
    .pipe(gulp.dest('dist'))
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// NOTE: First run everything to get setup
gulp.task('setup', ['fonts']);

// Dev task with browserSync and watch
gulp.task('dev', ['browserSync', 'minify-css', 'minify-js'], function() {
    gulp.watch(['less/*.less', 'vendor/bootstrap/dist/js/npm.js'], ['less']);
    // Require bootstrap js modules as neeeded in ../npm.js
    gulp.watch(['js/*.js', 'vendor/bootstrap/dist/js/npm.js', '!js/*.min.js'], ['minify-js']);
    // Reloads the browser whenever HTML CSS or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/*.css', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});

// Default build task with dist creation
gulp.task('default', ['dist']);
