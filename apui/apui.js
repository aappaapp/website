function createRipple(event) {
    const button = event.currentTarget;
    const circle = $(document).append('<span></span>');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    $(circle).css('width', circle.style.height = `${diameter}px`);
    $(circle).css('left', `${event.clientX - (button.offsetLeft + radius)}px`);
    $(circle).css('top', `${event.clientY - (button.offsetTop + radius)}px`);
    const ripple = $('.ripple');
    if (ripple) {
        ripple.remove();
    }
    $(button).append(circle);
}
$(function () {
    $('ap-button').mousedown(function () {
        createRipple(event);
    });
});
