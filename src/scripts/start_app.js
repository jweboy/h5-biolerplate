(function() {
    var Swiper = require('swiper');

    var animationControl = require('./animate_control');

    var $upArrow = $('#upArrow'),
        $musicBtn = $('#musicBtn');

    var bgMusic = $('audio')[0];

    var pageRender = function() {
        $('#loadingArea').fadeOut('slow', function() {
            $('#swiper').removeClass('u-hidden');
            $upArrow.removeClass('u-hidden');
            $musicBtn.removeClass('u-hidden');

            initSwiper();
        });
    };

    var initSwiper = function() {

        // 播放背景音乐
        $musicBtn.click(function() {
            console.log(bgMusic.paused);
            if (bgMusic.paused) {
                bgMusic.play();
                $(this).removeClass('paused');
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });

        // 初始化轮播
        new Swiper('.swiper-container', {
            mousewheelControl: true, // 是否开启鼠标控制Swiper切换 （用于调试）
            direction: 'vertical', // 垂直方向
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            speed: 400, // 轮播切换速度
            fade: {
                crossFade: false // 关闭淡出效果
            },
            effect: 'coverflow', // 类似3D界面切换
            coverflow: { // coverflow效果参数
                rotate: 100,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false // 关闭slides阴影
            },

            // flip: { // 3D翻转参数
            //     slideShadows: false // 关闭slides阴影
            // },

            onInit: function(swiper) { // 初始化回调
                // showElements(swiper);
                animationControl.initAnimationItems(); // 初始化动画操作
                animationControl.playAnimation(swiper); // 播放首屏动画
            },
            onTransitionStart: function(swiper) {
                if (swiper.activeIndex === swiper.slides.length - 1) { // 轮播到最后一页 隐藏向上箭头
                    $upArrow.hide();
                } else {
                    $upArrow.show();
                }
            },
            onTransitionEnd: function(swiper) {
                animationControl.playAnimation(swiper); // 播放当前页的动画
            },
            onTouchStart: function(swiper) {
                // 手机端不自动播放音乐, 通过模拟用户点击触发音乐按钮的点击事件来播放音乐
                if (!$musicBtn.hasClass('paused') && bgMusic.paused) {
                   // bgMusic.play();
                }
            }
        });
    }

    var showElements = function(swiper) {
        $(swiper.slides[swiper.activeIndex]).find('.slideElement').show();
    };

    var hideElements = function(swiper) {
        $(swiper.slides[swiper.previousIndex]).find('.slideElement').hide();
    };

    module.exports = {
        pageRender: pageRender
    };
}());
