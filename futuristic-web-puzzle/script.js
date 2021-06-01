function qrcode(text) {
    $('.qrcode').qrcode({
        width: 100,
        height: 100,
        text: text,
        render: 'table'
    });
    $('.qrcode').addClass('box');
    $('.qrcode').css({
        'padding': '10px',
        'display': 'inline-block'
    });
}
$(function () {
    var data_device = $('html').attr('data-device');
    firebase.database().ref('futurepuzzle').on('value', (snapshot) => {
        var data = snapshot.val();
        var phone = data.phone;
        var phonecolor = phone.color;
        var phonetext = phone.text || '';
        console.log(phonecolor, data_device);
        if (data_device == 'phone') {
            if (phonecolor == 'red') {
                $('body, .box').addClass('red');
            } else {
                $('body, .box').removeClass('red');
            }
        }
    });
});
