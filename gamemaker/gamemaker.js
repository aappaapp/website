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
            } else if (config == 'show') {
                $(result).show();
            };
        } else if (typeof config == 'object') {
            if (typeof config.createsprite != 'undefined') {
                if ($(result).attr('data-type') == 'scene') {
                    var id = config.createsprite.id;
                    $(result).append('<div data-id=\'' + id + '\' data-type=\'sprite\'></div>');
                } else {
                    throw new TypeError('The function \'createsprite\' should be used in the scene.');
                };
            }
            if (typeof config.hide != 'undefined') {
                var hide = config.hide;
                if (hide) {
                    $(result).hide();
                } else {
                    $(result).show();
                }
            };
        };
    };
    $.gamemaker = function () { };
    $.gamemaker.createscene = function (config) {
        if (typeof config != 'object') {
            throw new SyntaxError;
        } else {
            var errmsg = '';
            var type = config.type || errmsg;
            var w = config.w || errmsg;
            var h = config.h || errmsg;
            var bg = config.bg || errmsg;
            var id = config.id || errmsg;
            var show = config.show || errmsg;
            if (type == 'fullscreen') {
                w = '100vw';
                h = '100vh';
            };
            $('body').append('<div data-id=\'' + id + '\' data-type=\'scene\' style=\'width: ' + w + ';height: ' + h + ';background: ' + bg + ';\'></div>');
            if (show) {
                $(id).gamemaker('show');
            }
        };
    };
}(jQuery));
