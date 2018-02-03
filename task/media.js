import gulp from 'gulp'

// 拷贝媒体资源 => 考虑压缩
module.exports = () => gulp
  .src('src/resource/*')
  .pipe(gulp.dest('dist/resource'))
