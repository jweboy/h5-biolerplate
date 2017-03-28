/*eslint-disable no-console*/
/**
 * @author jweboy
 * @version  1.0.0
 */
import gulp from 'gulp';
import plugin from 'gulp-load-plugins';
import gulpsync from 'gulp-sync';

import del from 'del';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import streamSeries from 'stream-series';

import env from './config/env.js';
import config from './config/path.js';
import vendors from './config/vendors.js';

let _ = plugin();
let gulpSync = gulpsync(gulp);

// console.log(_);
// console.log('您当前所处的模式:' + env);

/**
 * @example开发环境相关配置
 * @namespace development
 */

/**
 * @example gulp系列的task任务配置
 *
 */

console.log(_);

// clean release floder
gulp.task('clean-files', function(cb) {
    return del(['release'], cb);
});

/**
 * 媒体资源文件
 * copy src/resource => release/resource
 */
gulp.task('publish-resource', () => {
    return gulp.src('src/resource/*')
        .pipe(gulp.dest('release/resource'));
});
/**
 * 音乐文件
 * copy src/imgs => release/imgs
 */
gulp.task('publish-images', () => {
    return gulp.src('src/imgs/*')

            // .pipe(_.imagemin())
            .pipe(gulp.dest('release/imgs'));
});

// minify+bundle src/styles/**/*.css => release/styles/bundle.min.css
gulp.task('publish-css', () => {
    return gulp.src('src/styles/**/*.css')
        .pipe(_.concat('bundle.min.css'))
        .pipe(_.autoprefixer())
        .pipe(_.minifyCss())
        .pipe(gulp.dest('release/styles'));

});

/**
 * 提取公用模块合并到自定义的js
 * 打包压缩
 */

// minify+bundle src/styles/**/*.js => release/styles/bundle.min.js
gulp.task('publish-js', () => {
    const jsVendors = vendors.js;

    return streamSeries(
        gulp.src(jsVendors),
        gulp.src('src/scripts/*.js')
            .pipe(_.plumber({
                errorHandler: errorAlert
            }))
    )
    .pipe(_.concat('bundle.min.js'))
    .pipe(gulp.dest('release/scripts'));

});

gulp.task('inject', () => {
    let target = gulp.src('src/index.html'),
        assets = gulp.src([
            'release/styles/bundle.min.css',
            'release/scripts/bundle.min.js'
          ], {
            read: false
        });

    return target.pipe(_.inject(assets, {
        ignorePath: 'release',
        addRootSlash: false,
        removeTags: true
    }))
    .pipe(gulp.dest('release'));
});

// gulp.task('htmlMin', () => {
//     return gulp.src(config.dist.htmlFile)
//         .pipe(_.htmlmin(config.htmlMinConfig))
//         .pipe(gulp.dest(config.dist.html));
// });

// gulp.task('publish-htmlRev', ['publish-css'], () => {
//     return gulp.src(['./**/*.json', 'src/index.html'])
//     .pipe(_.revCollector())
//     .pipe(gulp.dest('release'));
// });

// gulp.task('build', gulpSync.sync([
//     'publish-css',
//     'publish-htmlRev'
// ]));
//
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: 'release/'
        },
        open: false,
        logPrefix: 'h5Biolerplate',
        reloadOnRestart: true
    });

    gulp.watch('src/index.html', ['inject']);
    gulp.watch('src/scripts/**/*.js', ['publish-js']);
    gulp.watch('src/styles/**/*.css', ['publish-css']);
    gulp.watch('src/imgs/**/*', ['publish-images']);
    gulp.watch('src/resource/**/*', ['publish-resource']);

    gulp.watch('release/index.html').on('change', browserSync.reload);
    gulp.watch('release/scripts/*').on('change', browserSync.reload);
    gulp.watch('release/styles/*').on('change', browserSync.reload);
    gulp.watch('release/resource/*').on('change', browserSync.reload);

});

gulp.task('dev', (cb) => {
    runSequence(
        ['clean-files'],
        [
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

// default task
gulp.task('default', ['dev']);


let errorAlert = (error) => {
    _.notify.onError({
        title: `'Error in plugin' + ${error.plugin}`,
        message: 'Check your terminal',
        sound: 'Sosumi'
    })(error);

    console.log(error.toString());

    this.emit('end');
};


