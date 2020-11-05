var fileReader = new FileReader();
$('input').change(function (event) {
    console.log('sds');
    if (this.files.length > 0) {
        //有選取file時，使用fileReader讀取file資料
        //readAsDataURL可以將讀取到的file資料轉成
        //data:......的URL型式，在讀取完後觸發load
        //事件，URL存在FileReader.result中
        fileReader.readAsDataURL(this.files[0]);
    } else {
        //沒有選取file時，例如選擇取消，
        //將<img>的src設成""
        imageView.src = "";
    }
});
$('img').addEventListener("load", function (event) {
    //讀取後設定<img>的src
    this.src = this.result;
}, false);
