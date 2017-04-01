(function() {
    var $ = require('jquery'),
        startApp = require('./start_app'),
        preLoadData = require('./preload_data');

    var imgCount = preLoadData.images.length || 0;
    var loadedImages = 0;

    var loadImage = function() {
        if (loadedImages < imgCount) {
            var img = new Image();
            img.src = preLoadData.images.pop();
            if (img.complete) {
                imageLoaded(img.src);
                return;
            }
            $(img).on('load', function() {
                imageLoaded(img.src);
            }).on('error', function() {
                loadImage();
            });
        }
    };

    var imageLoaded = function(imgsrc) {
        loadedImages++;

        loadingProgress();

        if (imgsrc.indexOf('-bg.jpg') > 0) {
            imgName = imgsrc.substr(imgsrc.lastIndexOf('/')+1);
            tagName = imgName.split('.')[0];
            $('.'+tagName).css('background-image','url('+imgsrc+')');
        }

        if (loadedImages == imgCount) {
            startApp.pageRender();
        } else {
            loadImage();
        }
    };

    var loadingProgress = function() {
        $('#loadingText').text(Math.floor(loadedImages / imgCount * 100) + "%");
    }

    module.exports = {
        loadImage: loadImage
    }
}());
