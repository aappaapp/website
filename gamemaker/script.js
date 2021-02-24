$(function () {
    $.gamemaker().createscene({
        type: 'fullscreen',
        w: 360,
        h: 280,
        bg: 'black',
        sceneId: 'Scene1'
    });
    $.gamemaker('Scene1').addsprite({
        sd: 'sd'
    });
});
