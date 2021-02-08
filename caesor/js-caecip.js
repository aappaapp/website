/* js-caecip.js | Made By Aden Pun | adenpun.github.io */
function caecip(str, val) {
    var i;
    var output = [];
    var output2 = [];
    for (i = 0; i < str.length; i++) {
        output[i] = str[i].charCodeAt();
    }
    for (i = 0; i < output.length; i++) {
        //output2[i] = output[i] + val;
        output2[i] = String.fromCharCode(output[i] + val);
    }
    //console.log(str, output, output2, arrstick(output2));
    return arrstick(output2);
}

/* js-arrstick.js | Made By Aden Pun | adenpun.github.io */
function arrstick(arr, insert) {
    for (i = 0; i < arr.length; i++) {
        if (i != 0) {
            if (typeof insert == 'undefined') {
                insert = '';
            }
            arr[0] += insert + arr[i];
        }
    }
    return arr[0];
}
