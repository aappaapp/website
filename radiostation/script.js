$(function () {
    var tag = $('head').append('<script src=\'https://www.youtube.com/iframe_api\'></script>').find('script').last();
    setTimeout(function () {
        $('script').eq(0).before(tag);

        var player;
        function onYouTubeIframeAPIReady() {
            console.log('sd');
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'spNweNeRzQs',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
        function onPlayerReady(event) {
            event.target.playVideo();
        }
        var done = false;
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                setTimeout(stopVideo, 6000);
                done = true;
            }
        }
        function stopVideo() {
            player.stopVideo();
        }
    }, 100);
});
