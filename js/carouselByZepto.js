$(function () {
    /* 轮播图
    *  1、自动轮播
    *  2、手势轮播
    * */
    /*自动轮播*/
    autoCarousel();
    const WIDTH=document.body.clientWidth;
    var i=1;
    function autoCarousel() {
        var interval=setInterval(function () {
            i++;
            $(".zepImgs").animate({
                translateX: '-'+i*WIDTH+'px'
            },200,function () {
                if(i<1){
                    i=4;
                    $(".zepImgs").css({
                        transition:'none',
                        transform:'translate(-'+i*WIDTH+')px'
                    });
                }else if(i>4){
                    i=1;
                    $(".zepImgs").css({
                        transition:'none',
                        transform:'translate(-'+WIDTH+')px'
                    });
                }
            });
        },2000)
    }
    $(".touchTest").swipe(function () {
        console.log('滑动');
    });
});