function change() {
    window.random = Math.floor(Math.random() * (data.easy.length - 1)) + 0;
    window.text = data.easy[random];
    window.i;
    window.random2 = Math.floor(Math.random() * 3) + 0;
    $('#display').html('');
    for (i = 0; i < text.length; i++) {
        if (i != random2) {
            $('#display').html($('#display').html() + text[i]);
        } else {
            $('#display').html($('#display').html() + '<input style=\'width: 20px;\' id=\'input\'>');
        }
    }
    $('#input').focus();
    $('#input').change(function () {
        if ($('#input').val() == text[random2]) {
            change();
        }
    });
}
$(function () {
    $.get('list.json', function (data) {
        window.data = data;
    });
    $('#btn').click(function () {
        change();
    });
});
