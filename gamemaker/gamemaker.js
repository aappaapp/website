class gamemaker {
    constructor() { }
    createscene(type, x, y) {
    }
}
$.gamemaker = {
    createscene(type, x, y) {
        $('body').append('<p>' + x + y + '</p>');
        console.log(type + ' ' + x + ' ' + y);
    }
}
