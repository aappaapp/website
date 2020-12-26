if ($.cookie('systemjs') != undefined) {
    console.log($.cookie('systemjs') != undefined);
    $('head').append('<script src=' + $.cookie('systemjs') + '></script>');
}
window.systemjs = {
    value1: '',
    letMeKnow() {
        console.log(`The variable has changed to ${this.testVar}`);
        $('script.systemjs').attr('src', this.getValue);
        $.cookie('systemjs', this.getValue);
    },
    get getValue() {
        return this.value1;
    },
    set value(value) {
        this.value1 = value;
        this.letMeKnow();
    }
}
