function download(downloadnum){
    document.getElementById('config').classList.remove('jump-out-animation');
    document.getElementById('config').classList.add('jump-animation');
    document.getElementById('config').style.display = 'block';
    document.getElementById('config-setting').innerHTML = 'What addon you choose, I can\'t know what you choose. <br>Please try to choose again';
    if(downloadnum == 1){
        document.getElementById('config-setting').innerHTML = 'Nothing Now';
    }
}
window.addEventListener("click", function(event){
    function displaynone(){
        document.getElementById('config').style.display = 'none';
    }
    if(event.target == document.getElementById('config')){
        document.getElementById('config').style.display = 'none';
        document.getElementById('config').classList.remove('jump-animation');
        document.getElementById('config').classList.add('jump-out-animation');
    }
});
