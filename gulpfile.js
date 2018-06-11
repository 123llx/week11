var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var squence = require('gulp-squence');
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('src/css'))
})
gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify({ code: 1 }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))

})

gulp.task('uglify', function() {
    gulp.src(['src/js/**/*.js', '!src/js/**/*min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})
gulp.task('clean', function() {
    gulp.src('build')
        .pipe(clean())

})
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css'))

})
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass'])
})

gulp.task('default', ['sass', 'watch', 'server', 'uglify'])