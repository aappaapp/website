window.gamemaker = {
    sceneId: 0,
    createscene(config) {
        if (typeof config != 'object') {
            throw new SyntaxError;
        } else {
            var errmsg = '';
            var type = config.type || errmsg;
            var w = config.w || errmsg;
            var h = config.h || errmsg;
            var bg = config.bg || errmsg;
            if (type == 'fullscreen') {
                w = '100vw';
                h = '100vh';
            }
            $('body').append('<div data-sceneid=\'' + this.sceneId + '\' style=\'width: ' + w + ';height: ' + h + ';background: ' + bg + ';\'></div>');
            this.sceneId += 1;
            //console.log(type, x, y);
        }
    },
    getSceneById(value) {
        var result = $('*[data-sceneId=\'' + value + '\']')[0];
        if (typeof result == 'undefined') {
            throw new Error('Can\'t find the scene\nSceneId: ' + value)
        } else {
            return result;
        }
    }
};
$.gamemaker = window.gamemaker;
