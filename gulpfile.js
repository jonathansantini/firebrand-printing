const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const isProd = process.env.NODE_ENV === 'prod';

const htmlFile = [
    'src/*.html'
]

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('site'));
}

function css() {
    return gulp.src('src/sass/style.scss')
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest('site/css/'));
}

function js() {
    return gulp.src('src/js/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('all.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('site/js'));
}

function fonts() {
    return gulp.src('src/fonts/*')
      .pipe(gulp.dest('site/fonts'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './site'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/**/*.js', gulp.series(js, browserSyncReload));

    return;
}

function del() {
    return gulp.src('site/*', {read: false})
        .pipe(clean());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.fonts = fonts;
exports.del = del;
exports.serve = gulp.parallel(html, css, js, fonts, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, fonts);