$(function () {
    lang = navigator.language;
    $.get('allLang.json', function (data) {
        var i;
        for (i = 0; i < Object.keys(data).length; i++) {
            console.log(data[Object.keys(data)[i]]);
            var langcode = data[Object.keys(data)[i]]['langcode'];
            var langpath = data[Object.keys(data)[i]]['path'];
            if (typeof eval(langcode) == 'boolean') {
                if (eval(langcode)) {
                    $.get(langpath, function (data1) {
                        console.log(data1);
                        window.langtext = data1;
                    });
                }
            }
        }
    });
});
