function download(downloadnum){
    document.getElementById('config').style.display = 'block';
    document.getElementById('config-setting').innerHTML = 'What addon you choose, I can\'t know what you choose. <br>Please try to choose again';
    if(downloadnum == 1){
        document.getElementById('config-setting').innerHTML = '<input type="text" placeholder="nothing now">';
    }
}
//to copy downloadnum = 1 ==> <input type="text" placeholder="nothing now">
window.addEventListener("click", function(event){
    if(event.target == document.getElementById('config')){
        document.getElementById('config').style.display = 'none';
    }
});
function closeConfig(){
    document.getElementById('config').style.display = 'none';
}