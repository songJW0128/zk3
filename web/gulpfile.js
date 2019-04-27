var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var html = require('gulp-htmlmin');
var webserver = require('gulp-webserver');
//编译sass
gulp.task('deSass', function() {
        return gulp.src('./src/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css'))
    })
    //监听sass
gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('deSass'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8898,
            // open:true,
            // livereload:true
            proxies: [{
                source: '/api/getData',
                target: 'http://localhost:3000/api/getData'
            }, {
                source: '/api/addData',
                target: 'http://localhost:3000/api/addData'
            }, {
                source: '/api/delData',
                target: 'http://localhost:3000/api/delData'
            }]
        }))
})

gulp.task('default', gulp.series('deSass', 'server', 'watch'))