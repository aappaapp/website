(function () {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
function score() {
    $('.output').text(Math.round10((($('.value').val() - $('.min').val()) / ($('.max').val() - $('.min').val())) * 100), -1);
}
function orientationfuc() {
    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    if (orientation === "landscape-primary") {
        console.log("That looks good.");
    } else if (orientation === "landscape-secondary") {
        console.log("Mmmh... the screen is upside down!");
    } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
        console.log("Mmmh... you should rotate your device to landscape");
    } else if (orientation === undefined) {
        console.log("The orientation API isn't supported in this browser :(");
    }
}
$(document).ready(function () {
    window.screen.lockOrientation('portrait');
    orientationfuc();
    $('input').change(score);
    $('input[type=\'button\']').click(score);
    $(document).keypress(function () {
        if (event.which == 13) {
            score();
        }
    });
});
