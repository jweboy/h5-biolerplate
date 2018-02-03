import gulp from 'gulp'

// 拷贝图片 => 可以考虑gulp-imagemin考虑压缩
module.exports = () => gulp
  .src('src/imgs/*')
  .pipe(gulp.dest('dist/imgs'))
