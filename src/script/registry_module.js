define([], function() {
    return {
        init: function() {
            let $userflag = false;
            let $passflag = false;
            let $emflag = false;
            // var form = $('form');
            // var password = $('.password');

            //用户名
            $('.username').on('focus', function() {
                $('span').eq(0).html('支持中文，字母，数字，‘—’，‘_’的组合，4-20个字符');
                $('span').eq(0).css({
                    color: '#999'
                })
                $(this).attr("placeholder", " ");
            });
            $('.username').on('blur', function() {
                $(this).attr("placeholder", "你的账号名和登录名");
                $.ajax({
                        type: 'post',
                        async: 'false',
                        url: 'http://localhost/p/xiangmu/php/registry.php',
                        data: {
                            name: $(this).val()
                        }
                    })
                    .done((data) => {
                        if (!data) {
                            $('span').eq(0).html('');
                            $('i').eq(0).html('√');
                            $('i').eq(0).css({
                                'color': 'green',
                                'position': 'absolute',
                                'left': '410px',
                                'bottom': '10px'
                            })
                            $userflag = true;
                        } else {
                            $('i').eq(0).html('');
                            $('span').eq(0).html('该用户名已经存在');
                            $('span').eq(0).css({
                                color: 'red'
                            })
                            $userflag = false;
                        }
                    });
            });
            // 密码
            $('.password').on('focus', function() {
                $('span').eq(1).html('建议使用字母，数字和符号两种及以上的组合，6-20个字符');
                $('span').eq(1).css({
                    color: '#999'
                })
                $(this).attr("placeholder", " ");
            });
            $('.password').on('input', function() {
                if ($(this).val().length >= 6 && $(this).val().length <= 20) {
                    let reg1 = /\d+/;
                    let reg2 = /[a-z]+/;
                    let reg3 = /[A-Z]+/;
                    let reg4 = /[\W\_]+/;
                    let count = 0;
                    if (reg1.test($(this).val())) {
                        count++;
                    }
                    if (reg2.test($(this).val())) {
                        count++;
                    }
                    if (reg3.test($(this).val())) {
                        count++;
                    }
                    if (reg4.test($(this).val())) {
                        count++;
                    }

                    switch (count) {
                        case 1:
                            $('span').eq(1).html('弱：有被盗风险,建议使用字母、数字和符号两种及以上组合');
                            $('span').eq(1).css({
                                color: 'red'
                            })
                            $passflag = false;
                            break;
                        case 2:
                        case 3:
                            $('span').eq(1).html('中：安全强度适中，可以使用三种以上的组合来提高安全强度');
                            $('span').eq(1).css({
                                color: 'orange'
                            })
                            $passflag = true;
                            break;
                        case 4:
                            $('span').eq(1).html('强：你的密码很安全');
                            $('span').eq(1).css({
                                color: 'green'
                            })
                            $passflag = true;
                            break;
                    }
                } else {
                    $('span').eq(1).html('密码长度必须是6-20个字符');
                    $('span').eq(1).css({
                        color: 'red'
                    })
                    $passflag = false;
                }

            })
            $('.password').on('blur', function() {
                $(this).attr("placeholder", "建议至少使用两种字符组合");
                if ($(this).val() !== '') {
                    if ($passflag) {
                        $('span').eq(1).html('');
                        $('i').eq(1).html('√');
                        $('i').eq(1).css({
                            'color': 'green',
                            'position': 'absolute',
                            'left': '410px',
                            'bottom': '10px'
                        })
                    }
                } else {
                    $('span').eq(1).html('密码不能为空');
                    $('span').eq(1).css({
                        color: 'red'
                    })
                }
            });
            $('.email').on('blur', function() {
                $(this).attr("placeholder", "请输入邮箱")
                if ($(this).val() !== '') {
                    if ($passflag) {
                        $('span').eq(2).html('');
                        $('i').eq(2).html('√');
                        $('i').eq(2).css({
                            'color': 'green',
                            'position': 'absolute',
                            'left': '410px',
                            'bottom': '10px'
                        })
                        $emflag = true;
                    }
                } else {
                    $('span').eq(2).html('邮箱不能为空');
                    $('span').eq(2).css({
                        color: 'red'
                    });
                    $emflag = false;
                }
            });

            $('form').onsubmit = function() {
                if (!$userflag) {
                    return false;
                }
                if ($('.username').val() === '') {
                    $('span').eq(0).html('用户名不能为空');
                    $('span').eq(0).css({
                        color: 'red'
                    });
                    $userflag = false;
                }
                if (password.value === '') {
                    $('span').eq(1).html('密码不能为空');
                    $('span').eq(1).css({
                        color: 'red'
                    });
                    $passflag = false;
                }
                if ($('.email').value === '') {
                    $('span').eq(2).html('邮箱不能为空');
                    $('span').eq(2).css({
                        color: 'red'
                    });
                    $emflag = false;
                }
                if (!$userflag || !$passflag || !$emflag) {
                    return false; //阻止默认行为
                }
            };
        }
    }

})