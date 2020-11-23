// const gulp = require('gulp')
// const htmlmin = require('gulp-html')
// const uglify = require('gulp-uglify')
// const babel = require('gulp-babel')
// const sass = require('gulp-sass')
// const cleanCss = require('gulp-clean-css')
// const connect = require('gulp-connect')

const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const connect  = require('gulp-connect')
const sass = require('gulp-sass')

// 制定一个压缩html的任务
gulp.task('html', () => {
    gulp.src('src/**/*.html')
      .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS 
      }))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  })

  // 制定压缩js的任务 (先es6转es5，再压缩)
gulp.task('js', () => {
    gulp.src('src/js/**/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      // .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
  })

  gulp.task('css', () => {
    gulp.src('src/css/**/*.scss')
      .pipe(sass())
      .pipe(cleanCss())
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
  })

  // 制定一个开启服务器的任务
gulp.task('server', () => {
    connect.server({
      root: 'dist',
      port: 1996,
      livereload: true
    })
  })

  // 移动图片
gulp.task('img', () => {
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

// 移动libs
gulp.task('libs', () => {
  gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))
})


// 制定一个watch任务监听文件的改变
gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/css/**/*.scss', ['css'])
    gulp.watch('src/js/**/*.js', ['js'])
  })

  // 把所有要执行的任务放在一起
gulp.task('default', ['html', 'css', 'js', 'server', 'img', 'libs', 'watch'])