define([], function() {
    return {
        init: function() {

            $(function() {
                //商品移入显示加入购物车
                $('.list').hover(
                    function() {
                        $(this).find('.add').stop().slideToggle();
                    },
                    function() {
                        $(this).find('.add').stop().slideToggle();
                    }
                );

                //悬浮侧导航
                $('.fixed_nav .to a').on('click', function() {
                    $(this).addClass('curr').siblings().removeClass('curr');
                    $('body,html').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 200);
                    return false;
                });
            });

            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?90534763860635eb4d32603dc389f334";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    }

})