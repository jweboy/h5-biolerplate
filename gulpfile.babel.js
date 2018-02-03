/*eslint-disable no-console*/
/**
 * @author jweboy
 * @version  1.0.1
 * @description 更新内容 1. 升级gulp 4.0
 */

// native node api
import fs from 'fs';
import path from 'path';
// gulp core api
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
// other api
import del from 'del';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import streamSeries from 'stream-series';
import source from 'vinyl-source-stream';
// import download from 'download';


import env from './config/env';
// import vendors from './config/vendors';
import syncConfig from './config/sync';
import {
	clean,
	picture,
	download,
	media,
	font
} from './task'

let plugins = loadPlugins();
// console.log('您当前所处的模式:' + env);


/**
 * gulp相关任务配置
 *
 */

 const prepareTak = [
	clean,
	download,
]

 const copyTask = gulp.parallel([
	picture,
	 media,
	 font
])

const build = gulp.series(
	prepareTak,
	copyTask
)

gulp.task('default', build)

// /**
//  * 合并自定义css和模块依赖css
//  * css新属性前缀自动补全
//  */

// gulp.task('publish-css', () => {
//     let cssVendors = vendors.styles;

//     return streamSeries(
//             gulp.src(cssVendors),
//             gulp.src('src/styles/**/*.css')
//             .pipe(plugins.plumber({
//                 errorHandler: errorAlert
//             }))
//             .pipe(plugins.autoprefixer())
//         )
//         .pipe(plugins.concat('bundle.css'))
//         .pipe(gulp.dest('release/styles'));
// });

// /**
//  * 提取js功能模块,在main主入口中输出模块
//  * 合并公用js模块到main.js
//  */
// gulp.task('publish-js', () => {
//     return browserify({
//             entries: ['src/scripts/main.js']
//         })
//         .bundle()
//         .pipe(plugins.plumber({
//             errorHandler: errorAlert
//         }))
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('release/scripts'));
// });

// // 将打包合并的bundle.js 与 bundle.css 动态写入到 index.html中
// gulp.task('inject', () => {
//     let target = gulp.src('src/index.html'),
//         assets = gulp.src([
//             'release/styles/bundle.css',
//             'release/scripts/bundle.js'
//         ], {
//             read: false
//         });

//     return target.pipe(plugins.inject(assets, {
//             ignorePath: 'release',
//             addRootSlash: false,
//             removeTags: true
//         }))
//         .pipe(gulp.dest('release'));
// });

// // 压缩css
// gulp.task('minify-css', () => {
//     return gulp.src('release/styles/bundle.css')
//         .pipe(plugins.cleanCss({
//             debug: true
//         }))
//         .pipe(plugins.rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('release/styles'));
// });

// // 压缩js
// gulp.task('minify-js', () => {
//     return gulp.src('release/scripts/bundle.js')
//         .pipe(plugins.uglify())
//         .pipe(plugins.rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('release/scripts'));
// });

// // 注入 bundle.min.css 和 bundle.min.js
// gulp.task('inject-html', () => {
//     let target = gulp.src('src/index.html'),
//         assets = gulp.src(
//             [
//                 'release/styles/bundle.min.css',
//                 'release/scripts/bundle.min.js'
//             ], {
//                 read: false
//             });

//     return target.pipe(plugins.inject(assets, {
//             ignorePath: 'release/',
//             addRootSlash: false,
//             removeTags: true
//         }))
//         .pipe(plugins.htmlmin())
//         .pipe(gulp.dest('release'));
// });

// // gulp.task('minify-html', () => {
// //     return gulp.src('release/index.html')
// //             .pipe(plugins.htmlmin({
// //                 minifyJS: true
// //             }))
// //             .pipe(gulp.dest('release'));
// // });

// // 删除开发模式的bundle
// gulp.task('del-bundle', (cb) => {
//     return del(
//         [
//             'release/styles/bundle.css',
//             'release/scripts/bundle.js'
//         ]
//     )
// });

// /**
//  * 启动一个静态资源服务器, 默认端口3000
//  * 监听开发目录src中文件变化
//  * 监听发布目录release中文件变化, 并刷新浏览器
//  */
// gulp.task('watch-dev', () => {
//     browserSync(syncConfig.dev);

//     gulp.watch('src/index.html', ['inject']);
//     gulp.watch('src/scripts/**/*.js', ['publish-js']);
//     gulp.watch('src/styles/**/*.css', ['publish-css']);
//     gulp.watch('src/imgs/**/*', ['publish-images']);
//     gulp.watch('src/resource/*', ['publish-resource']);
//     gulp.watch('src/fonts/*', ['publish-fonts']);

//     gulp.watch('release/index.html').on('change', browserSync.reload);
//     gulp.watch('release/scripts/*').on('change', browserSync.reload);
//     gulp.watch('release/styles/*').on('change', browserSync.reload);
//     gulp.watch('release/resource/*').on('change', browserSync.reload);
//     gulp.watch('release/fonts/*').on('change', browserSync.reload);

// });

// gulp.task('preview-build', () => {
//     browserSync(syncConfig.build);
// });

// // 开发环境的任务处理, 依照次序依次进行
// gulp.task('dev', (cb) => {
//     runSequence(
//         ['clean-files'], ['request-vendors'], [
//             'publish-fonts',
//             'publish-images',
//             'publish-resource',
//             'publish-css',
//             'publish-js'
//         ],
//         'inject',
//         'watch-dev',
//         cb
//     );
// });

// // 生产环境的任务处理, 依照次序依次进行
// gulp.task('build', (cb) => {
//     runSequence(
//         [
//             'minify-css',
//             'minify-js'
//         ], [
//             'inject-html',
//             'del-bundle'
//         ], [
//             'preview-build'
//         ],
//         cb
//     );
// });

// // default task
// // gulp.task('default', [env]);
// gulp.task('default', gulp.series('clean', () => {
//     console.log('del is ok');
// }))


// let errorAlert = (error) => {
//     plugins.notify.onError({
//         title: `'Error in plugin' + ${error.plugin}`,
//         message: 'Check your terminal'
//     })(error);

//     console.log(error.toString());

//     this.emit('end');
// };
