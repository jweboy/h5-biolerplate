(function() {
    var $ = require('jquery');

    module.exports = {
        initAnimationItems: function() {
            var aniDuration, aniDelay;
            $('.slide-element').each(function() {
                //存储elemnt上原有的classList
                $(this).attr('data-origin-class', $(this).attr('class'));

                aniDuration = $(this).data('ani-duration');
                aniDelay = $(this).data('ani-delay');

                //处理好动画相关效果
                $(this).css({
                    'visibility': 'hidden',
                    'animation-duration': aniDuration,
                    '-webkit-animation-duration': aniDuration,
                    'animation-delay': aniDelay,
                    '-webkit-animation-delay': aniDelay
                });
            });
        },

        playAnimation: function(swiper) {
            this.clearAnimation();

            var $aniItems = $(swiper.slides[swiper.activeIndex]).find('.slide-element');

            var aniName;

            $aniItems.each(function() {

                $(this).css({
                    'visibility': 'visible'
                });
                aniName = $(this).data('ani-name');

                //添加动画名字
                $(this).addClass(aniName);
            });
        },

        clearAnimation: function() {
            $('.slide-element').each(function() {
                $(this).css({
                    'visibility': 'hidden'
                });

                $(this).attr('class', $(this).data('origin-class'));
            });
        }
    };
}());

