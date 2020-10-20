//game.js function
$('#HomePage').toUI('homepage');
$('#start-btn').toUI('startbtn');
$('#gamearea').toUI('gamearea');
$('#pause-btn').toUI('pausebtn');
$('#pause-page').toUI('pausepage');
$('#continue-btn').toUI('continuebtn');
$('#santa-fight').toUI('fightpage', 'santa');
$('#save-btn').toUI('savebtn');
$( '#sprite' ).toSprite('sprite');
$( '#sprite' ).toSprite('control', '10,10');
$( '#sprite' ).teleport('', 100, 200);
$('#santa').toSprite('enemy', 'santa');
$('#santa').teleport('', 200, 200);

//my custom script with jquery
$('#mercy-btn').click(function(){
    $('#mercy-alert').css('display', 'block');
});
$('#mercy-alert #cancel-btn').click(function(){
    $('#mercy-alert').css('display', 'none');
});

//my custom script with function
if($().overlap($('#sprite'), $('#santa-fight #btn input#fight-btn'))){
}