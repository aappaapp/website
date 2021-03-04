$(function () {
    $.get('test.json', function (data) {
        var objdat = Object.keys(data);
        var objdatval = Object.keys(data.value);
        var i;
        var a;
        console.log(objdatval);
        for (i = 0; i < objdatval.length; i++) {
            console.log(objdatval[i]);
            $('body').append('<div class=\'bar\' data-id=\'' + data.value[objdatval[i]].id + '\' style=\'background-color: ' + data.value[objdatval[i]].bgcolor + ';color: ' + data.value[objdatval[i]].txtcolor + ';\'>' + objdatval[i] + '</div>');
        }
        a = 0;
        setInterval(function () {
            var j;
            var objdatrunval = Object.keys(data.runvalue);
            for (j = 0; j < objdatrunval.length; j++) {
                $('.bar').each(function () {
                    try {
                        var datrunvalobjdatrunvalthis = data.runvalue[objdatrunval[a]][$(this).attr('data-id')];
                    } catch { }
                    $(this).width(datrunvalobjdatrunvalthis / 10 + '%');
                });
            }
            $('.phase').text(objdatrunval[a]);
            a++;
        }, 500);
    });
});
