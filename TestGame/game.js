var vh = $(window).height();
var vw = $(window).width();
$.fn.toUI = function(type){
    if(type == 'startbtn'){
        this.addClass('starbtn');
    } else if(type == 'gamearea'){
        this.addClass('gamarea');
    } else if(type == 'homepage'){
        this.addClass('hompage');
    } else if(type == 'pausebtn'){
        this.addClass('pausbtn');
    } else if(type == 'pausepage'){
        this.addClass('pauspage');
    } else if(type == 'continuebtn'){
        this.addClass('continubtn');
    } else if(type == 'savebtn'){
        this.addClass('savbtn');
    } else {
        console.error('...toUI(\'' + type + '\') is wrong');
    }
};
$.fn.toSprite = function(type, config){
    if(type == 'sprite'){
        this.addClass('sprte');
        var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2));
        if(thcstopstr <= 400){
            this.teleport('gravity', 0, 0);
        }
    } else if(type == 'control'){
        this.addClass('sprte');
        this.addClass('control');
        window.xspeed = config.split(',')[0];
        window.yspeed = config.split(',')[1];
    } else if(type == 'enemy'){
        this.addClass('sprte');
        this.addClass('enemy');
        this.addClass(config);
    } else {
        console.error('...rite(\'' + type + '\') is wrong');
    }
};
$.fn.teleport = function(type, x, y){
    if(this.hasClass('sprte') == true){
        if(type == ''){
            this.css('left', x/10 + 'vw');
            this.css('top', y/10 + 'vh');
        } else if(type == 'move'){
            var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2));
            var thcsleftstr = Number(this.css('left').substr(0, this.css('left').length - 2));
            this.css('left', thcsleftstr + x + 'px');
            this.css('top', thcstopstr + y + 'px');
        } else {
            console.error('...port(\'' + type + '\'...is wrong');
        }
    } else {
        console.error('id: ' + this.attr('id') + ' is not a sprite');
    }
};
$.fn.overlap = function(firstitem, seconditem){
	var d1_offset             = firstitem.offset();
	var d1_height             = firstitem.outerHeight( true );
	var d1_width              = firstitem.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
    var d1_distance_from_left = d1_offset.left + d1_width;
    
	// Div 2 data
	var d2_offset             = seconditem.offset();
	var d2_height             = seconditem.outerHeight( true );
	var d2_width              = seconditem.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;
    window.overlap = seconditem.attr('class');

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};
$.fn.intoFight = function(enemyname){
    $('.' + enemyname).css('display', 'none')
}
$.fn.generate = function(){

}
$.fn.setCookie = function(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
$.fn.getCookie = function(cname){
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return '';
}
$.fn.checkCookie = function(){
    console.log('d')
    var xcoordinate = $().getCookie('xcoordinate');
    var ycoordinate = $().getCookie('ycoordinate');
    if (xcoordinate != '' && ycoordinate != ''){
        console.log('coordinate x is ' + xcoordinate + ', y is ' + ycoordinate)
    }
}
$(document).ready(function(){
    $().checkCookie();
    $(window).contextmenu(function(event){
        event.preventDefault();
    });
    $('.starbtn').click(function(){
        window.start = true;
        $('.hompage').css('display', 'none');
        $('.gamarea').css('display', 'block');
        $('.pausbtn').css('display', 'block');
    });
    $('.pausbtn').click(function(){
        $('.pauspage').css('display', 'block');
        $('.pausbtn').css('display', 'none');
    });
    $('.pauspage').click(function(event){
        if($(event.target).hasClass('pauspage')){
            $('.pauspage').css('display', 'none');
            $('.pausbtn').css('display', 'block');
        }
    });
    $('.continubtn').click(function(){
        $('.pauspage').css('display', 'none');
        $('.pausbtn').css('display', 'block');
    });
    $('.savbtn').click(function(){
        $().setCookie('xcoordinate', $('.control').css('left'), 365);
        $().setCookie('ycoordinate', $('.control').css('top'), 365);
    });
    $(window).keydown(function(){
        if(window.start){
            if($().overlap($('.control'), $('.enemy'))){
                var overlap = window.overlap;
                if(overlap.includes('santa')){
                    $().intoFight('santa');
                }
            }
            var xspeed = Number(window.xspeed);
            var yspeed = Number(window.yspeed);
            if(event.which == 39){
                $('.control').teleport('move', xspeed, 0);
                $('.control').removeClass('flip');
            } else if(event.which == 37){
                $('.control').teleport('move', Number('-' + xspeed), 0);
                $('.control').addClass('flip');
            } else if(event.which == 38){
                $('.control').teleport('move', 0, Number('-' + yspeed));
            } else if(event.which == 40){
                $('.control').teleport('move', 0, yspeed);
            } else if(event.which == 116){
                event.preventDefault();
            } else if(event.which == 32){
                if($('.control').hasClass('flip')){
                    $('.control').teleport('move', Number('-' + xspeed * 10), 0);
                } else {
                    $('.control').teleport('move', xspeed * 10, 0);
                }
            }
        }
    });
});