(function() {

   var $ = require('jquery');
    var FastClick = require('fastclick');
    var swiper = require('swiper');

    var preLoadBgImg = require('./preload_bgImg');

    $(function() {
        // setTimeout(function() {
        //     $(window).scrollTop(1);
        // }, 0);
        // document.getElementById('car_audio').volume = 0.5;
        // document.getElementById('car_audio').play();
        // document.addEventListener("WeixinJSBridgeReady", function() {
        //     WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
        //         document.getElementById('car_audio').play();
        //     });
        // }, false);

        // 解决移动端点击300ms延迟问题
        FastClick.attach(document.body);

        // 加载页面资源
        preLoadBgImg.loadImage();

        console.log(FastClick);
    });
})();
