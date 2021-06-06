function changepage(page) {
    if (page == 'back') {
        page = $('.lastpage').attr('id');
    }
    $('.lastpage').removeClass('lastpage');
    $('page.show').addClass('lastpage');
    $('page.show').removeClass('show');
    $('page#' + page).addClass('show');
}
$(function () {
    $('#startbtn').click(function () {
        changepage('main');
    });
});
