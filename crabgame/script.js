function start() {
    window.timer = 3;
    $('#doll').hide();
    $('#game').show();
    $('#displaytext').text(window.timer);
    $('#displaytext').text(window.timer);
    window.timeritv = setInterval(function () {
        window.timer -= 1;
        $('#displaytext').text(window.timer);
        if (window.timer <= 0) {
            clearInterval(timeritv);
            $('#doll').show();
            window.detectitv = setInterval(function () {
                //if (window.keys.in) { }
                if (window.keys.includes(65) || window.keys.includes(68) || window.keys.includes(83) || window.keys.includes(87)) {
                    clearInterval(detectitv);
                    clearInterval(timeritv);
                    clearInterval(moveitv);
                    clearInterval(detectwinitv);
                    $('#ded').show();
                    $('#game').hide();
                }
            });
            setTimeout(function () {
                clearInterval(detectitv);
                start();
            }, 3000);
        }
    }, 1000);
}
function move() {
    window.moveitv = setInterval(function () {
        if (window.keys.includes(65) || window.keys.includes(68) || window.keys.includes(83) || window.keys.includes(87)) {
            $('player').css({
                'left': '0',
                'top': '0'
            });
        }
        if (window.keys.includes(65)) {
            $('#player').css('left', $('#player').position().left - 1);
        }
        if (window.keys.includes(68)) {
            $('#player').css('left', $('#player').position().left + 1);
        }
        if (window.keys.includes(83)) {
            $('#player').css('top', $('#player').position().top + 1);
        }
        if (window.keys.includes(87)) {
            $('#player').css('top', $('#player').position().top - 1);
        }
    });
}
function detectwin() {
    window.detectwinitv = setInterval(function () {
        if ($('#player').position().top <= 0) {
            clearInterval(detectitv);
            clearInterval(timeritv);
            clearInterval(moveitv);
            clearInterval(detectwinitv);
            $('#win').show();
            $('#game').hide();
        }
    });
}
$(function () {
    window.keys = [];
    $('#start').show();
    $('#startbtn').click(function () {
        $('#start').hide();
        start();
        move();
        detectwin();
    });
    $(document).keydown(function () {
        var i;
        //console.log(event.which);
        window.keys.push(event.which);
        //console.log(window.keys);
        //window.keys[event.which] = true;
    });
    $(document).keyup(function () {
        //window.keys.splice(window.keys.indexOf(event.which), 1);
        delete window.keys[0];
        //delete window.keys[event.which];
    });
    var keyitv = setInterval(function () {
        for (i = 0; i < window.keys.length; i++) {
            delete window.keys[i];
        }
    }, 100);
});
