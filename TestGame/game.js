var vh = $(window).height()
var vw = $(window).width()
$.fn.toUI = function(type){
    if(type == 'startbtn'){
        this.addClass('starbtn')
    } else if(type == 'gamearea'){
        this.addClass('gamarea')
    } else if(type == 'homepage'){
        this.addClass('hompage')
    } else if(type == 'pausebtn'){
        this.addClass('pausbtn')
    } else if(type == 'pausepage'){
        this.addClass('pauspage')
    } else if(type == 'continuebtn'){
        this.addClass('continubtn')
    } else {
        console.error('...toUI(\'' + type + '\') is wrong')
    }
};
$.fn.toSprite = function(type, config){
    if(type == 'sprite'){
        this.addClass("sprte")
        var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2))
        if(thcstopstr <= 400){
            this.teleport('gravity', 0, 0)
        }
    } else if(type == 'control') {
        this.addClass("sprte")
        this.addClass("control")
        window.xspeed = config.split(',')[0];
        window.yspeed = config.split(',')[1];
    } else if(type == 'enemy') {
        this.addClass("sprte")
        this.addClass("enemy")
    } else {
        console.error('...rite(\'' + type + '\') is wrong')
    }
};
$.fn.teleport = function(type, x, y){
    if(this.hasClass('sprte') == true){
        if(type == ''){
            this.css('left', x/10 + 'vw')
            this.css('top', y/10 + 'vh')
        } else if(type == 'move'){
            var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2))
            var thcsleftstr = Number(this.css('left').substr(0, this.css('left').length - 2))
            this.css('left', thcsleftstr + x + 'px')
            this.css('top', thcstopstr + y + 'px')
        } else {
            console.error('...port(\'' + type + '\'...is wrong')
        }
    } else {
        console.error('id: ' + this.attr('id') + ' is not a sprite')
    }
};
$(document).ready(function(){
    $(window).contextmenu(function(event){
        event.preventDefault()
    })
    $('.starbtn').click(function(){
        $('.hompage').css('display', 'none')
        $('.gamarea').css('display', 'block')
        $('.pausbtn').css('display', 'block')
    })
    $('.pausbtn').click(function(){
        $('.pauspage').css('display', 'block')
        $('.pausbtn').css('display', 'none')
    })
    $('.pauspage').click(function(event){
        if($(event.target).hasClass('pauspage')){
            $('.pauspage').css('display', 'none')
            $('.pausbtn').css('display', 'block')
        }
    })
    $('.continubtn').click(function(){
        $('.pauspage').css('display', 'none')
        $('.pausbtn').css('display', 'block')
    })
    $(window).keydown(function(){
        var xspeed = Number(window.xspeed)
        var yspeed = Number(window.yspeed)
        if(event.which == 39){
            $('.control').teleport('move', xspeed, 0)
            $('.control').removeClass('flip')
        } else if(event.which == 37){
            $('.control').teleport('move', Number('-' + xspeed), 0)
            $('.control').addClass('flip')
        } else if(event.which == 38){
            $('.control').teleport('move', 0, Number('-' + yspeed))
        } else if(event.which == 40){
            $('.control').teleport('move', 0, yspeed)
        } else if(event.which == 116){
            event.preventDefault()
        } else if(event.which == 32){
            if($('.control').hasClass('flip')){
                $('.control').teleport('move', Number('-' + xspeed * 10), 0)
            } else {
                $('.control').teleport('move', xspeed * 10, 0)
            }
        }
    })
})