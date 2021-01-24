$(function () {
    brolang = navigator.language;
    $.get('./lang.json', function (data) {
        var i;
        for (i = 0; i < Object.keys(data).length; i++) {
            console.log(data[Object.keys(data)[i]]);
            var langcode = data[Object.keys(data)[i]]['langcode'];
            var langpath = data[Object.keys(data)[i]]['path'];
            if (typeof eval(langcode) == 'boolean') {
                if (eval(langcode)) {
                    $.get(langpath, function (data) {
                        langdata = data.split(';');
                    });
                }
            }
        }
    });
});
function reloadchange() {
    setTimeout(function () {
        var data = langdata;
        var i;
        for (i = 0; i < data.length; i++) {
            var data2 = data[i].split('=');
            console.log(data2);
            if (data2.length >= 3) {
                var dataarr = JSON.parse(JSON.stringify(data2));
                dataarr.splice(0, 1);
                dataarr = arrstick(dataarr, '=');
                data2 = [data2[0], dataarr];
            }
            $('html').html($('html').html().replace('{{' + data2[0].trim() + '}}', data2[1]));
            console.log(data2);
        }
    }, 1000);
}
