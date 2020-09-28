define([], function() {
    return {
        init: function() {
            const $list = $('.tempWrap .main');
            const $list2 = $('.tempWrap .right-m');
            $.ajax({
                    url: 'http://192.168.13.59/xiangmu/projectname/php/wenmei.php',
                    dataType: 'json' //设置json格式的对象。
                })
                .done((data) => {
                    let $renderdata = data;
                    let $strhtml = ''; //拼接字符串
                    $.each($renderdata, function(index, value) {
                        $strhtml += `
                            <div class="product-item list in">
                                        <a href="detail.html?sid=${value.sid}">
                                            <img class="lazy" src="${value.url}">
                                        </a>
                                        <p class="name" >${value.title}</p>
                                        <p class="price">￥${value.price}</p>
                                        <div class="add">
                                <a class="star stars0" href="/product/243" target="_blank"></a>
                                <a href="detail.html" class="btn" target="_blank"><span></span>加入购物车</a>
                            </div>
                            </div>
                            
                        `;
                        if (index == 1) {
                            return false
                        }
                    });
                    $list2.html($strhtml);
                    //懒加载效果
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            $.ajax({
                    url: 'http://192.168.13.59/xiangmu/projectname/php/wenmei.php',
                    dataType: 'json' //设置json格式的对象。
                })
                .done((data) => {
                    let $renderdata = data;
                    let $strhtml = ''; //拼接字符串
                    $.each($renderdata, function(index, value) {
                        $strhtml += `
                            <div class="product-item list in">
                                        <a href="detail.html?sid=${value.sid}">
                                            <img class="lazy" src="${value.url}">
                                        </a>
                                        <p class="name" >${value.title}</p>
                                        <p class="price">￥${value.price}</p>
                                        <div class="add">
                                <a class="star stars0" href="/product/243" target="_blank"></a>
                                <a href="detail.html" class="btn" target="_blank"><span></span>加入购物车</a>
                            </div>
                            </div>   
                            
                        `;
                        if (index == 3) {
                            return false
                        }
                    });
                    $list.html($strhtml);
                    //懒加载效果
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });


            //Lunbo
            let $liW = $('.banner .temp-wrap ul li').first().width();
            let index = null;
            $('.banner .temp-wrap ul').width($('.banner .temp-wrap ul li').size() * $liW + 'px');
            $(".banner .temp-wrap ol li").click(function() { //小圆点切换图片
                index = $(this).index() - 1;
                move();
            });

            function move() { //右移
                index++;
                if (index === $(".banner .temp-wrap ol li").length + 1) {
                    $('.banner .temp-wrap ul').css({
                        left: 0
                    })
                    index = 1
                }
                if (index === 5) {
                    $(".banner .temp-wrap ol li").eq(0).addClass("active").siblings().removeClass("active");
                }
                if (index === -1) {
                    $('.banner .temp-wrap ul').css({
                        left: -($('.banner .temp-wrap ul li').length - 1) * $liW + 'px'
                    })
                    index = $(".banner .temp-wrap ol li").length - 1;
                }
                $(".banner .temp-wrap ol li").eq(index).addClass("active").siblings().removeClass("active");
                $(".banner .temp-wrap ul").animate({ left: -$liW * index });
            };
            $('#bleft').click(function() { //点击左箭头
                index -= 2;
                move();
            });
            $('#bright').click(function() { //点击右箭头
                move();
            });
            $(".banner .temp-wrap ").hover(function() { //鼠标移入暂停，移出继续
                    $('#bleft').css({
                        display: 'block'
                    });
                    $('#bright').css({
                        display: 'block'
                    })
                    clearInterval($timer);
                },
                function() {
                    $('#bleft').css({
                        display: 'none'
                    });
                    $('#bright').css({
                        display: 'none'
                    })
                    $timer = setInterval(move, 3000);
                });
            let $timer = setInterval(move, 3000); //自动轮播

            // nav search
            $(".header_search .text").on('focus', function() {
                $('.header_search .keyword').hide();
                $(".header_search .text").css({
                    outline: '2px solid #e32332'
                })
                $(".header_search .btn").css({
                    outline: '1px solid #e32332'
                })
            })
            $(".header_search .text").on('blur', function() {
                $('.header_search .keyword').show();
                $(".header_search .text").css({
                    outline: '1px solid #CCC'
                })
                $(".header_search .btn").css({
                    outline: '1px solid #e32332'
                })
            })
        }
    }
})