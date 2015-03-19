var gulp = require('gulp');
var open = require('open');
var connect = require('gulp-connect');
var del = require('del');
var glob = require('glob');
var runSequence = require('run-sequence');
var uglifyjs = require('gulp-uglifyjs');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
var to5 = require('gulp-6to5');

var to5options = {
    loose: 'all'
};

var paths = {
    sourceBase: './src/',
    destBase: './app/'
};

gulp.task('server', function() {
    var serverOptions = {
        root: paths.destBase,
        host: 'localhost',
        livereload: false,
        port: 9000
    };
    connect.server(serverOptions);
    open('http://localhost:' + serverOptions.port);
});

gulp.task('clean', ['clean:css', 'clean:scripts', 'clean:html']);

gulp.task('clean:css', function(cb) {
    del([paths.destBase + '/*.css'], {
        force: true
    }, cb);
});

gulp.task('clean:scripts', function(cb) {
    del([paths.destBase + '/*.js'], {
        force: true
    }, cb);
});


gulp.task('clean:html', function(cb) {
    del([paths.destBase + '/*.html'], {
        force: true
    }, cb);
});

gulp.task('css', function() {
    var processors = [
        require('autoprefixer-core'),
        require('postcss-custom-properties')(),
        require('postcss-nested'),
        require('csswring').postcss,
    ];
    return gulp.src(['styles.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.destBase))
        .pipe(connect.reload());
});

gulp.task('script', function() {
    return gulp.src('script.js')
        .pipe(plumber())
        .pipe(to5(to5options))
        .pipe(uglifyjs('script.js'))
        .pipe(gulp.dest(paths.destBase))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest(paths.destBase))
        .pipe(connect.reload());
});

gulp.task('build', ['clean'], function(cb) {
    runSequence('css', 'script', 'html', cb);
});

gulp.task('default', ['build'], function(cb) {
    runSequence('server', cb);
});
