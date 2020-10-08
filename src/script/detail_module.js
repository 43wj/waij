define(['jcookie'], function() {
    return {
        init: function() {
            let datasid = location.search.substring(1).split('=')[1];
            if (!datasid) {
                datasid = 1;
            }
            $.ajax({
                url: 'http://localhost/xiangmu/projectname/php/detail.php',
                data: {
                    sid: datasid
                },
                dataType: 'json'
            }).done((data) => {
                let objdata = data;
                $('.bd .tempWrap ul li img').attr('src', objdata.url);
                $('.hd  ul li img').attr('src', objdata.url);
                $('.title h1').html(objdata.title);
                $('.price').html(objdata.price);
                let arr = objdata.piclisturl.split(',');
                let strhtml = '';
                $.each(arr, function(index, value) {
                    strhtml += `
                <li><img src="${value}"/></li>
            `;
                });
                $('.bd ul').html(strhtml);
                $('.hd ul').html(strhtml);
                lb();
            });

            function lb() {
                $('.hd ul li:nth-of-type(1)').addClass("select");
                let $liW = $('.bd ul li').first().width();
                let index = null;
                $('.bd ul').width($('.bd ul li').size() * $liW + 'px');
                $(".hd ul li").click(function() { //小圆点切换图片
                    index = $(this).index() - 1;
                    move();
                });
                let $timer = setInterval(move, 3000); //自动轮播
                function move() { //右移
                    index++;
                    if (index === $(".hd ul li").length) {
                        $('.bd ul').css({
                            left: 0
                        })
                        index = 0
                    }
                    if (index === $(".hd ul li").length) {
                        $(".hd ul li").eq(0).addClass("select").siblings().removeClass("select");
                    }
                    $(".hd ul li").eq(index).addClass("select").siblings().removeClass("select");
                    $(".bd ul").stop(true).animate({ left: -$liW * index });
                };
                $(".gallery").hover(function() { //鼠标移入暂停，移出继续
                        clearInterval($timer);
                    },
                    function() {
                        $timer = setInterval(move, 3000);
                    });
            }

            let arrsid = [];
            let arrnum = [];

            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.btn_addCart').on('click', function() {
                console.log(1);
                getcookie();
                if ($.inArray(datasid, arrsid) === -1) {
                    arrsid.push(datasid);
                    $.cookie('cookiesid', arrsid, 10);
                    arrnum.push($('.amount input').val());
                    $.cookie('cookienum', arrnum, 10)
                } else {
                    let sidindex = $.inArray(datasid, arrsid);
                    let newarrnum = parseInt(arrnum[sidindex]) + parseInt($('.amount input').val());
                    arrnum[sidindex] = newarrnum;
                    $.cookie('cookienum', arrnum, 10);
                }
                alert('商品已加入购物车');
            });





        }
    }

})