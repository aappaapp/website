$(document).ready(function(){
    $('#Generate').click(function(){
        var text = 'value: \'' + $('#apssfg-input').val(); + '\';';
        var blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, 'file.apss');
    });
});