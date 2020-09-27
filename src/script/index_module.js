define([], function() {
    return {
        init: function() {
            const $list = $('.tempWrap .main');
            const $list2 = $('.tempWrap .right-m');
            $.ajax({
                    url: 'http://localhost/xiangmu/projectname/php/wenmei.php',
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
                            </div>
                        `;
                        if (index == 1) {
                            return false
                        }
                    });
                    $list2.html($strhtml);
                    //懒加载效果
                    // $("img.lazy").lazyload({
                    //     effect: "fadeIn" //图片显示方式
                    // });
                });
            $.ajax({
                    url: 'http://localhost/xiangmu/projectname/php/wenmei.php',
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
                            </div>
                        `;
                        if (index == 3) {
                            return false
                        }
                    });
                    $list.html($strhtml);
                    //懒加载效果
                    // $("img.lazy").lazyload({
                    //     effect: "fadeIn" //图片显示方式
                    // });
                });
        }
    }

})