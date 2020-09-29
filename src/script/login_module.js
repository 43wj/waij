define(['sha1'], function() {
    return {
        init: function() {
            $('.submit').on('click', function() {
                $.ajax({
                        type: 'post',
                        url: 'http://localhost/p/xiangmu/php/login.php',
                        data: {
                            user: $('input').eq(0).val(),
                            pass: hex_sha1($('input').eq(1).val())
                        }
                    })
                    .done((data) => {
                        if (!data) {
                            alert('用户名或者密码错误');
                            $('input').eq(0).val('');
                            $('input').eq(1).val('');
                        } else {
                            location.href = 'index.html';
                            localStorage.setItem('username', $('input').eq(0).val())
                        }
                    })
            });
        }
    }

})