function main() {
    var i = 0;
    var startamount = Number($('.amount').text());
    firebase.database().ref('money').once('value').then((snapshot) => {
        var dv = snapshot.val().dv || 100;
        var ps = snapshot.val().ps || '-';
        var pv = snapshot.val().pv || 1;
        var itv = setInterval(function () {
            var amount = Number($('.amount').text());
            $('.amount').text(eval('amount' + ps + pv));
            var ifc;
            if (ps == '+') {
                ifc = startamount + dv - 1;
            } else if (ps == '-') {
                ifc = startamount - dv + 1
            }
            if (amount == ifc) {
                clearInterval(itv);
                if (pv != 1) {
                    $('.amount').text(eval(startamount + ps + dv))
                }
                firebase.database().ref('money/start').set(false);
            }
        });
    });
}
$(function () {
    firebase.database().ref('money/reload').set(false);
    firebase.database().ref('money/start').on('value', (snapshot) => {
        var data = snapshot.val() || false;
        if (data) {
            main();
        }
    });
    $('.main').click(function () {
        firebase.database().ref('money/start').set(true);
    });
    $(document).keypress(function () {
        if (event.key == 'F5') {
            firebase.database().ref('money/reload').set(true);
        }
    });
});
