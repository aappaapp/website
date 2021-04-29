/* jquery-gamemaker.js | Made By Aden Pun | adenpun.github.io */
(function ($) {
    $.fn.gamemaker = function (config) {
        var value = this.selector;
        var result = $('*[data-id=\'' + value + '\']')[0];
        if (typeof config == 'string') {
            if (config == 'get') {
                if (typeof result == 'undefined') {
                    throw new Error('Can\'t find the object\nid: ' + value);
                };
                return result;
            } else if (config == 'hide') {
                $(result).hide();
                console.warn('The object is hiding now.');
            } else if (config == 'show') {
                $(result).show();
                console.warn('The object is showing now.');
            } else if (config == 'remove') {
                $(result).remove();
                console.warn('The object is removed.');
            } else if (config == 'gravity') {
                $(result).data('gravity_sprite', true);
                console.warn('The object has gravity now.');
            } else if (config == 'gravity_floor') {
                $(result).data('gravity_floor', true);
                console.warn('The object is gravity floor now.');
            } else {
                $.gamemaker.help();
            };
        } else if (typeof config == 'object') {
            if (typeof config.createsprite != 'undefined') {
                if ($(result).attr('data-type') == 'scene') {
                    var id = config.createsprite.id || '';
                    var img = config.createsprite.img || '';
                    var vid = config.createsprite.vid || '';
                    var autoplay = config.createsprite.autoplay || false;
                    var onended = config.createsprite.onended || function () { };
                    var text = config.createsprite.text || '';
                    var txtcolor = config.createsprite.txtcolor || 'black';
                    var mw = config.createsprite.mw || 0;
                    var mh = config.createsprite.mh || 0;
                    var x = config.createsprite.x || 0;
                    var y = config.createsprite.y || 0;
                    $(result).append('<div data-id=\'' + id + '\' data-type=\'sprite\'><img src=\'' + img + '\' style=\'max-width: ' + mw + ';max-height: ' + mh + ';\'><video src=\'' + vid + '\' style=\'max-width: ' + mw + ';max-height: ' + mh + ';\'></video><span style=\'color: ' + txtcolor + ';\'>' + text + '</span></div>');
                    console.log(id, x, y);
                    if (x != 0 || y != 0) {
                        $(result).find('div[data-id=\'' + id + '\'] > *').css({
                            'position': 'absolute',
                            'left': x,
                            'top': y
                        });
                        if (x == '50%') {
                            $(result).find('div[data-id=\'' + id + '\'] > *').addClass('translateX');
                        };
                        if (y == '50%') {
                            $(result).find('div[data-id=\'' + id + '\'] > *').addClass('translateY');
                        };
                        if (x == '50%' && y == '50%') {
                            $(result).find('div[data-id=\'' + id + '\'] > *').removeClass('translateX');
                            $(result).find('div[data-id=\'' + id + '\'] > *').removeClass('translateY');
                            $(result).find('div[data-id=\'' + id + '\'] > *').addClass('translate');
                        };

                    };
                    if (autoplay) {
                        $(result).find('div[data-id=\'' + id + '\'] > video')[0].play();
                    };
                    if ($(result).find('div[data-id=\'' + id + '\'] > video').length != 0) {
                        $(result).find('div[data-id=\'' + id + '\'] > video').on('ended', onended);
                    };
                    console.warn('The sprite: ' + id + ' was created.');
                } else {
                    throw new SyntaxError('The function \'createsprite\' should be used in the scene.');
                };
            };
            if (typeof config.show != 'undefined') {
                var show = config.show;
                if (show) {
                    $(value).gamemaker('hide');
                } else {
                    $(value).gamemaker('show');
                };
            };
            if (typeof config.gravity != 'undefined') {
                var gravity = config.gravity;
                if (gravity) {
                    $(value).gamemaker('gravity');
                };
            };
            if (typeof config.gravityFloor != 'undefined') {
                var gravityFloor = config.gravityFloor;
                if (gravityFloor) {
                    $(value).gamemaker('gravity_floor');
                };
            };
            if (typeof config.click != 'undefined') {
                if (typeof config.click == 'function') {
                    $(result).off('click');
                    $(result).click(config.click);
                };
            };
        } else {
            $.gamemaker.help();
        };
    };
    $.gamemaker = function () {
        $.gamemaker.help();
    };
    $.gamemaker.help = function () {
        var txt = 'help';
        txt += '\n====='
        txt += '\n$(ID).gamemaker();'
        console.log(txt);
    };
    $.gamemaker.playaudio = function () { };
    $.gamemaker.createscene = function (config) {
        if (typeof config != 'object') {
            throw new SyntaxError;
        } else {
            var type = config.type || '';
            var w = config.w || 100;
            var h = config.h || 100;
            var bg = config.bg || 'black';
            var id = config.id || '';
            var show = config.show || false;
            if (type == 'fullscreen') {
                w = '100vw';
                h = '100vh';
            };
            $('body').append('<div data-id=\'' + id + '\' data-type=\'scene\' style=\'width: ' + w + ';height: ' + h + ';background: ' + bg + ';\'></div>');
            console.warn('The scene: ' + id + ' was created.');
            if (show) {
                $(id).gamemaker('show');
            };
        };
    };
    $(document).contextmenu(function () {
        event.preventDefault();
    });
    window.ondragstart = function () {
        return false;
    };
    var gravityitv = window.setInterval(function () {
        var allele = $('*');
        var i;
        for (i = 0; i < allele.length; i++) {
            var alleledat = $($('*')[i]).data();
            if (typeof alleledat.gravity_sprite != 'undefined') {
                $(allele[i]).css({});
            };
        };
    });
}(jQuery));
