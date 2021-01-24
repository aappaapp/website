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
