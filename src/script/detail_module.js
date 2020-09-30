define(['jcookie'], function() {
    return {
        init: function() {
            let datasid = location.search.substring(1).split('=')[1];
            const spic = $('.big-p'); //小图
            const bpic = $('#bpic'); //大图
            const sf = $('#sf'); //小放
            const bf = $('#bf'); //大放

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
                $('#smallpic').attr('src', objdata.url);
                $('.title').html(objdata.title);
                $('.price').html(objdata.price);
                $('#bpic').attr('src', objdata.url);
                let arr = objdata.piclisturl.split(',');
                let strhtml = '';
                $.each(arr, function(index, value) {
                    strhtml += `
                <li><img src="${value}"/></li>
            `;
                });

                $('.s-p').html(strhtml);

                hidearrow();
            });
            //4.放大镜
            spic.hover(function() {
                sf.css({
                    visibility: 'visible'
                });
                bf.css({
                    visibility: 'visible'
                });
                sf.css({
                    width: spic.outerWidth() * bf.outerWidth() / bpic.outerWidth(),
                    height: spic.outerHeight() * bf.outerHeight() / bpic.outerHeight()
                });
                let bili = bpic.outerWidth() / spic.outerWidth();
                spic.on('mousemove', function(e) {
                    let left = e.pageX - $('.big-p').offset().left - sf.width() / 2;
                    let top = e.pageY - $('.big-p').offset().top - sf.height() / 2;
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= spic.width() - sf.width()) {
                        left = spic.width() - sf.width();
                    }

                    if (top <= 0) {
                        top = 0;
                    } else if (top >= spic.height() - sf.height()) {
                        top = spic.height() - sf.height();
                    }

                    sf.css({
                        left: left,
                        top: top
                    });
                    bpic.css({
                        left: -bili * left,
                        top: -bili * top
                    });
                });
            }, function() {
                sf.css({
                    visibility: 'hidden'
                });
                bf.css({
                    visibility: 'hidden'
                });
            });

            $('.s-p').on('click', 'li', function() {
                let picurl = $(this).find('img').attr('src');
                spic.find('img').attr('src', picurl);
                bpic.attr('src', picurl);
            });

            let piclen = 6;

            function hidearrow() {
                if ($('.s-p  li').size() <= piclen) {
                    $('#right').css({
                        color: '#fff'
                    })
                }
            }

            $('#right').on('click', function() {
                let liwidth = $('.s-p  li').eq(0).outerWidth(true);
                if ($('.s-p  li').size() > piclen) {
                    piclen++;
                    $('#left').css({
                        color: '#333'
                    });
                    if (piclen === $('.s-p  li').size()) {
                        $('#right').css({
                            color: '#fff'
                        });
                    }
                    $('.s-p ').animate({
                        left: -(piclen - 6) * liwidth
                    });
                }
            });

            $('#left').on('click', function() {
                let liwidth = $('.s-p  li').eq(0).outerWidth(true);
                if (piclen > 6) {
                    piclen--;
                    $('#right').css({
                        color: '#333'
                    });
                    if (piclen === 6) {
                        $('#left').css({
                            color: '#fff'
                        });
                    }
                    $('.s-p ').animate({
                        left: -(piclen - 6) * liwidth
                    });
                }
            });


            let arrsid = [];
            let arrnum = [];

            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.add-btn a').on('click', function() {
                getcookie();
                if ($.inArray(datasid, arrsid) === -1) {
                    arrsid.push(datasid);
                    $.cookie('cookiesid', arrsid, 10);
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, 10)
                } else {
                    let sidindex = $.inArray(datasid, arrsid);
                    let newarrnum = parseInt(arrnum[sidindex]) + parseInt($('#count').val());
                    arrnum[sidindex] = newarrnum;
                    $.cookie('cookienum', arrnum, 10);
                }
                alert('商品已加入购物车');
            });
        }
    }

})