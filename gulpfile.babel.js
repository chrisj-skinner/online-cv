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
    return gulp.src('css/base.css')
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

// Copy
gulp.task('copy', function() {
    return gulp.src([
        'css/*.min.css*',
        'js/*.min.js*',
        'vendor/font-awesome/fonts/**',
        'index.html',
        'img/**'],
        { base: './' })
    .pipe(gulp.dest('dist'));
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Run everything
gulp.task('default', ['minify-css', 'minify-js']);

// Build task with dist creation
gulp.task('build', ['default', 'copy']);

// Clean task
// gulp.task('build')

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'default'], function() {
    gulp.watch('less/*.less', ['less']);
    // Require bootstrap js modules as neeeded in ../npm.js
    gulp.watch(['js/theme.js', 'node_modules/bootstrap/dist/js/npm.js', '!js/*.min.js'], ['minify-js']);
    // Reloads the browser whenever HTML CSS or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/*.css', browserSync.reload);
    gulp.watch('js/*.js', browserSync.reload);
});
