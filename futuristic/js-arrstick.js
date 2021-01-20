/* js-arrstick.js | Made By Aden Pun | adenpun.github.io */
function arrstick(arr) {
    for (i = 0; i < arr.length; i++) {
        if (i != 0) {
            arr[0] += arr[i];
        }
    }
    return arr[0];
}
