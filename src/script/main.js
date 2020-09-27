//模块的配置
require.config({
    paths: { //路径
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD的模块，支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jcookie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }
});
// require(['index_module']);//加载模块的方式 

require(['jquery', 'jcookie', 'jlazyload'], function() {

    let pagemod = $('#currentpage').attr('data-page');
    console.log(pagemod);

    //2.加载script标签里面约定的模块名。
    require([pagemod], function(page) {
        page.init();
    });
})