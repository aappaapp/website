function home_page() {
    window.top.location.href = './index.html';
}
function faq_page() {
    window.top.location.href = './faq.html';
}
function addon_page() {
    window.top.location.href = './mcaddon.html';
}
function page_choose() {
    window.top.location.href = './page_choose.html'
}
function github_page() {
    window.top.location.href = 'https://github.com/adenpun/adenpun.github.io';
}
function tools_page() {
    window.top.location.href = './tools.html';
}
function onenoob_page() {
    window.top.location.href = './onenewhand';
}
function pingpong_page() {
    window.top.location.href = './pingpong';
}
function game_page(value) {
    if (value == 1) {
        window.top.location.href = './ADENTALE';
    } else if (value == 2) {
        window.top.location.href = './SolerFight';
    }
}
console.log(window.location.host);
$(document).ready(function () {
    $.get('header.html', function (data) {
        $('#content').before(data);
    });
    $.get('footer.html', function (data) {
        $('#content').after(data);
    });
    $.get('bottom-nav.html', function (data) {
        $('#content').after(data);
    });
});
