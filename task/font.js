import gulp from 'gulp'

// 拷贝字体资源
module.exports = () => gulp
  .src('src/fonts/*')
  .pipe(gulp.dest('dist/fonts'))
