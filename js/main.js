window.onload = function () {
    scroll();
    banner();
    var scroll = function () {
        var header = document.getElementsByTagName('header')[0];
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var dest = 0.85;
            var opc = 0;
            /*从50到500px，渐变到0.85*/
            if (scrollTop >= 50) {
                opc = (scrollTop - 50) * (0.85 / 450);
                header.style.backgroundColor = 'rgba(255, 135, 135,' + opc + ')';
            } else if (scrollTop >= 500) {
                header.style.backgroundColor = 'rgba(255, 135, 135, 0.85)';
            }
        }
    };
    var banner = function () {
        /*1、自动轮播、无缝轮播——定时器+过渡效果
        * 2、索引点随着图片的轮播改变——根据索引切换
        * 3、图片随着手指滑动而改变位置——利用touch事件完成
        * 4、滑动结束——滑动距离不超过1/3—吸附回原图片
        * 5、滑动结束——滑动距离超过1/3—切换下一张
        * */
        const WIDTH = document.body.clientWidth;
        var bannerImgs = document.querySelector('.bannerUl');
        var bannerNums = document.querySelector('.bannerNum');
        /*自动轮播*/
        var index = 1;
        var imgsLenth = document.querySelectorAll('.banner').length;
        var interval = null;
        startInterval();
        /*滑动对轮播的影响*/
        var touchStartPoint = 0;
        var touchEndPoint = 0;
        var touchBefore = 0;
        bannerImgs.addEventListener('touchstart', function (e) {
            touchStartPoint = e.touches[0].clientX;
            transitionEnd();
            clearInterval(interval);
        });
        bannerImgs.addEventListener('touchmove', function (e) {
            var touchNowX = e.touches[0].clientX;
            var move = -index * WIDTH + touchNowX - touchStartPoint;
            transitionEnd();
            translateMove(move);
        });
        bannerImgs.addEventListener('touchend', function (e) {
            touchEndPoint = e.changedTouches[0].clientX;
            var move = touchEndPoint - touchStartPoint;
            transitionEnd();
            if (Math.abs(move) > 0) {
                if (Math.abs(move) < (WIDTH * 0.3)) {
                    transitionStart();
                    translateMove(-index * WIDTH);
                } else {
                    if (move < 0) {
                        index++;
                    } else {
                        index--;
                    }
                    transitionStart();
                    translateMove(-index * WIDTH);
                }
            }
            startInterval();
            touchStartPoint = 0;
            touchEndPoint = 0;
            touchBefore = 0;
        });
        bannerImgs.addEventListener('transitionend', function () {
            /*如果轮播到最后一张，切回第一张*/
            if (index >= imgsLenth - 1) {
                index = 1;
                transitionEnd();
                translateMove(-index * WIDTH);
            }
            if (index < 1) {
                index = imgsLenth - 2;
                transitionEnd();
                translateMove(-index * WIDTH);
            }
            setNums();
        });

        function startInterval() {
            interval = setInterval(function () {
                index++;
                transitionStart();
                translateMove(-index * WIDTH);
            }, 2000);
        }

        function transitionStart() {
            bannerImgs.style.transition = 'all 0.5s';
            bannerImgs.style.webkitTransition = 'all 0.5s';
        }

        function transitionEnd() {
            bannerImgs.style.transition = 'none';
            bannerImgs.style.webkitTransition = 'none';
        }

        function translateMove(x) {
            bannerImgs.style.transform = 'translateX(' + x + 'px)';
            bannerImgs.style.webkitTransform = 'translateX(' + x + 'px)';
        }

        function setNums() {
            /*设置底部位置栏切换到当前图片*/
            document.querySelector('.thisImg').setAttribute('class', '');
            document.querySelectorAll('.bannerNum>li')[index - 1].setAttribute('class', 'thisImg');
        }
    };
};