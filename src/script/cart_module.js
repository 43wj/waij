define([], function() {
    return {
        init: function() {
            function showlist(sid, num) { //sid：编号  num：数量
                $.ajax({
                    url: 'http://localhost/xiangmu/projectname/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid == value.sid) {
                            let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆隐藏元素
                            $clonebox.find('.goods-pic').find('img').attr('src', value.url);
                            $clonebox.find('.goods-pic').find('img').attr('sid', value.sid);
                            $clonebox.find('.goods-d-info').find('a').html(value.title);
                            $clonebox.find('.b-price').find('strong').html(value.price);
                            $clonebox.find('.quantity-form').find('input').val(num);
                            //计算单个商品的价格
                            $clonebox.find('.b-sum').find('strong').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block');
                            $('.item-list').append($clonebox);
                            calcprice(); //计算总价
                        }
                    });

                });
            }
            //cookie
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let s = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
                let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
                $.each(s, function(index, value) {
                    showlist(s[index], n[index]);
                });
            }


            //算总价
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());

                    }
                });
                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html($count.toFixed(2));
            }

            //全选按钮
            $(".allsel").prop('checked', false);
            $('.dx').prop('checked', false);
            $(".allsel").on('change', function() {
                if (this.checked == true) {
                    $('.dx').prop('checked', true);
                    $('.btn-area a').css({
                        background: '#e32332'
                    })
                } else {
                    $('.dx').prop('checked', false);
                    $('.btn-area a').css({
                        background: '#B0B0B0'
                    })
                }
            })
            $(".dx").on('change', function() {
                var len = $(".dx").length;
                let checkedLen = $(".dx:checked").length;
                if (checkedLen > 0) {
                    $('.btn-area a').css({
                        background: '#e32332'
                    })
                } else {
                    $('.btn-area a').css({
                        background: '#B0B0B0'
                    })
                }
                if (len == checkedLen) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
            })

            $('.allsel').on('change', function() {
                $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcprice(); //计算总价
            });
            $('.dx').on('change', function() {
                calcprice(); //计算总价
            });

            //改变数量
            $('.quantity-add').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
                $num++;
                $(this).parents('.goods-item').find('.quantity-form input').val($num);

                $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });


            $('.quantity-down').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num);
                $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });
            $('.quantity-form input').on('input', function() {
                let $reg = /^\d+$/g; //只能输入数字
                let $value = $(this).val();
                if (!$reg.test($value)) { //不是数字
                    $(this).val(1);
                }
                $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });

            //计算单价
            function calcsingleprice(obj) { //obj元素对象
                let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
                let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
                return ($dj * $num).toFixed(2)
            }


            //将改变后的数量存放到cookie中
            let arrsid = []; //存储商品的编号。
            let arrnum = []; //存储商品的数量。
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
                    arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }

            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.goods-item').find('img').attr('sid');
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }


            //6.删除
            function delcookie(sid, arrsid) {
                let $index = -1;
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);
                $.cookie('cookienum', arrnum, -1);
                $.cookie('cookiesid', arrsid, -1);
            }
            $('.b-action a').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goods-item').remove();
                    delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
                    calcprice(); //计算总价
                }
            });

            $('.operation a').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $('.goods-item:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    calcprice(); //计算总价
                }
            });


        }
    }

})