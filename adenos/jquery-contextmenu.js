$(function () {
    $(document).contextmenu(function () {
        event.preventDefault();
        console.log(event.pageX);
    });
});
