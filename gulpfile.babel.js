/*eslint-disable no-console*/
/**
 * @author jweboy
 * @version  1.0.0
 */
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

import del from 'del';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import streamSeries from 'stream-series';
import source from 'vinyl-source-stream';


import env from './config/env';
import vendors from './config/vendors';

let plugins = loadPlugins();
console.log(env);
// console.log('您当前所处的模式:' + env);

/**
 * @example开发环境相关配置
 * @namespace development
 */

/**
 * @example gulp系列的task任务配置
 *
 */
// 清理文件目录 release
gulp.task('clean-files', function(cb) {
    return del(['release'], cb);
});

// 拷贝媒体资源  copy src/resource => release/resource
gulp.task('publish-resource', function() {
    return gulp.src('src/resource/*')
        .pipe(gulp.dest('release/resource'));
});

// 拷贝图片资源  copy src/imgs => release/imgs
gulp.task('publish-images', function() {
    return gulp.src('src/imgs/*')
        .pipe(gulp.dest('release/imgs'));
});

// 拷贝字体资源  copy src/fonts => release/fonts
gulp.task('publish-fonts', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('release/fonts'));
});

/**
 * 合并自定义css和模块依赖css
 * css新属性前缀自动补全
 */
let cssVendors = vendors.styles;

gulp.task('publish-css', function() {
    return streamSeries(
        gulp.src(cssVendors),
        gulp.src('src/styles/**/*.css')
            .pipe(plugins.plumber({
                errorHandler: errorAlert
            }))
            .pipe(plugins.autoprefixer())
    )
    .pipe(plugins.concat('bundle.css'))
    .pipe(gulp.dest('release/styles'));
});

/**
 * 提取js功能模块,在main主入口中输出模块
 * 合并公用js模块到main.js
 */
let jsVendors = vendors.scripts;
jsVendors.push('src/scripts/main.js');
console.log(jsVendors);

gulp.task('publish-js', function() {
    return browserify({
            entries: jsVendors
        })
        .bundle()
        .pipe(plugins.plumber({
            errorHandler: errorAlert
        }))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('release/scripts'));
});

// 将打包合并的bundle.js 与 bundle.css 动态写入到 index.html中
gulp.task('inject', function() {
    let target = gulp.src('src/index.html'),
        assets = gulp.src([
            'release/styles/bundle.css',
            'release/scripts/bundle.js'
          ], {
            read: false
        });

    return target.pipe(plugins.inject(assets, {
        ignorePath: 'release',
        addRootSlash: false,
        removeTags: true
    }))
    .pipe(gulp.dest('release'));
});

// 压缩css
gulp.task('minify-css', () => {
    return gulp.src('release/styles/bundle.css')
        .pipe(plugins.cleanCss({
            debug: true
        }))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('release/styles'));
});

// 压缩js
gulp.task('minify-js', () => {
    return gulp.src('release/scripts/bundle.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('release/scripts'));
});

// 注入 bundle.min.css 和 bundle.min.js
gulp.task('inject-html', () => {
    let target = gulp.src('src/index.html'),
        assets = gulp.src(
            [
                'release/styles/bundle.min.css',
                'release/scripts/bundle.min.js'
            ], {
                read: false
            });

    return target.pipe(plugins.inject(assets, {
        ignorePath: 'release/',
        addRootSlash: false,
        removeTags: true
    }))
    .pipe(plugins.htmlmin())
    .pipe(gulp.dest('release'));
});

// gulp.task('minify-html', () => {
//     return gulp.src('release/index.html')
//             .pipe(plugins.htmlmin({
//                 minifyJS: true
//             }))
//             .pipe(gulp.dest('release'));
// });

// 删除开发模式的bundle
gulp.task('del-bundle', (cb) => {
    return del(
        [
            'release/styles/bundle.css',
            'release/scripts/bundle.js'
        ]
    )
});

/**
 * 启动一个静态资源服务器, 默认端口3000
 * 监听开发目录src中文件变化
 * 监听发布目录release中文件变化, 并刷新浏览器
 */
gulp.task('watch', function() {
    browserSync({
        port: 8888,
        ui: {
            port: 8889,
            weinre: {
                port: 8886
            }
        },
        server: {
            baseDir: 'release/'
        },
        open: false,
        logPrefix: 'H5Biolerplate',
        reloadOnRestart: true
    });

    gulp.watch('src/index.html', ['inject']);
    gulp.watch('src/scripts/**/*.js', ['publish-js']);
    gulp.watch('src/styles/**/*.css', ['publish-css']);
    gulp.watch('src/imgs/**/*', ['publish-images']);
    gulp.watch('src/resource/*', ['publish-resource']);
    gulp.watch('src/fonts/*', ['publish-fonts']);

    gulp.watch('release/index.html').on('change', browserSync.reload);
    gulp.watch('release/scripts/*').on('change', browserSync.reload);
    gulp.watch('release/styles/*').on('change', browserSync.reload);
    gulp.watch('release/resource/*').on('change', browserSync.reload);
    gulp.watch('release/fonts/*').on('change', browserSync.reload);

});

// 开发环境的任务处理, 依照次序依次进行
gulp.task('dev', function(cb) {
    runSequence(
        ['clean-files'],
        [
            'publish-fonts',
            'publish-images',
            'publish-resource',
            'publish-css',
            'publish-js'
        ],
        'inject',
        'watch',
        cb
    );
});

gulp.task('build', (cb) => {
    runSequence(
        [
            'minify-css',
            'minify-js'
        ],
        [
            'inject-html',
            'del-bundle'
        ],
        cb
    );
});

// default task
gulp.task('default', [env]);


let errorAlert = function(error) {
    notify.onError({
        title: `'Error in plugin' + ${error.plugin}`,
        message: 'Check your terminal',
        sound: 'Sosumi'
    })(error);

    console.log(error.toString());

    this.emit('end');
};


