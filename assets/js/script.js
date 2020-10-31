function home_page() {
    window.top.location.href = 'index.html';
}
function faq_page() {
    window.top.location.href = 'faq.html';
}
function addon_page() {
    window.top.location.href = 'mcaddon.html';
}
function page_choose() {
    window.top.location.href = 'page_choose.html'
}
function github_page() {
    window.top.location.href = 'https://github.com/adenpun/adenpun.github.io';
}
function game_page(config) {
    if (config == 1) {
        window.top.location.href = 'ADENTALE/index.html';
    } else if (config == 2) {
        window.top.location.href = 'SoulKnight/index.html';
    }
}
