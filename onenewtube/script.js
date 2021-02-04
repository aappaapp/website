function openNav() {
    $('.sidenav').css('width', '250px');
}
function closeNav() {
    $('.sidenav').css('width', '0px');
}
$(function () {
    $('body > *').wrapAll('<div class=\'content\'></div>');
    $.get('./nav.html', function (data) {
        $('body > .content').before(data);
    });
    $.get('./sidenav.html', function (data) {
        $('body > .content').before(data);
        $('.content, nav').click(function () {
            closeNav();
        });
    });
    setTimeout(function () {
        $(document).attr('title', window.langtext['text.title']);
        $('nav .title').text(window.langtext['text.title']);
        $('.sidenav .home').text(window.langtext['text.home']);
    }, 500);
});
