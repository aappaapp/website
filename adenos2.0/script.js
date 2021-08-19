window._init.custom = function () {
    console.log('init custom');
    window._start.texts[window._start.texts.length] = 'Custom Init Script Text1';
    window._start.texts[window._start.texts.length] = 'Custom Init Script Text2';
    window._start.texts[window._start.texts.length] = 'Custom Init Script Text3';
};
$(function () {
    _start();
});
