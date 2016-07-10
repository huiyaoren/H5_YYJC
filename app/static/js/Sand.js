/**
 * Created by wslsh on 2016/7/9.
 */
function Sand($box) {
    var $div = $("<div class='_sand'></div>");

    this.run = function () {
        $box.append($div)
    };
    this.move = function (X, Y) {
        movementX = Number($div.css("left").slice(0, -2)) + X;
        movementY = Number($div.css("top").slice(0, -2)) + Y;
        $div
            .css("left", movementX)
            .css("top", movementY)
    };
    this.position = function () {
        return [Number($div.css("left").slice(0, -2)), Number($div.css("top").slice(0, -2))]
    };
}