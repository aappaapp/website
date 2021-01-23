/* jquery-overlap.js | Made By Aden Pun | adenpun.github.io */
function isOverlap(idOne, idTwo) {
    var objOne = $(idOne),
        objTwo = $(idTwo),
        offsetOne = objOne.offset(),
        offsetTwo = objTwo.offset(),
        topOne = offsetOne.top,
        topTwo = offsetTwo.top,
        leftOne = offsetOne.left,
        leftTwo = offsetTwo.left,
        widthOne = objOne.width(),
        widthTwo = objTwo.width(),
        heightOne = objOne.height(),
        heightTwo = objTwo.height();
    var leftTop = leftTwo > leftOne && leftTwo < leftOne + widthOne && topTwo > topOne && topTwo < topOne + heightOne, rightTop = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne && topTwo > topOne && topTwo < topOne + heightOne, leftBottom = leftTwo > leftOne && leftTwo < leftOne + widthOne && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne, rightBottom = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne;
    return leftTop || rightTop || leftBottom || rightBottom;
}
