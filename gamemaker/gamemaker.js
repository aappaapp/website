(function ($) {
    $.gamemaker = function (value) {
        if (typeof value != 'undefined') {
            var result = $('*[data-sceneId=\'' + value + '\']')[0];
            if (typeof result == 'undefined') {
                throw new Error('Can\'t find the scene\nSceneId: ' + value);
            }
        }
    };
    $.addsprite = function (config) {
        console.log(config);
    };
    $.fn.createscene = function (config) {
        if (typeof config != 'object') {
            throw new SyntaxError;
        } else {
            var errmsg = '';
            var type = config.type || errmsg;
            var w = config.w || errmsg;
            var h = config.h || errmsg;
            var bg = config.bg || errmsg;
            var sceneId = config.sceneId || errmsg;
            if (type == 'fullscreen') {
                w = '100vw';
                h = '100vh';
            };
            $('body').append('<div data-sceneid=\'' + sceneId + '\' style=\'width: ' + w + ';height: ' + h + ';background: ' + bg + ';\'></div>');
        };
    }
}(jQuery));
