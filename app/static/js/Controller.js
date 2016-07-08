/**
 * Created by wslsh on 2016/6/20.
 */

// 摇杆 类
function Controller(div) {// todo 样式未从css文件中剥离出来 用代码控制控件位置
    var box = div.getElementsByTagName("canvas")[0];
    var fakeBox = div.getElementsByTagName("div")[0];
    var ctx = box.getContext("2d");
    var d = box.width > box.height ? box.height : box.width;
    var resistance = 0.01;
//                ctx.arc(d / 2, d / 2, d / 2, 0, 2 * Math.PI);
//                ctx.stroke();
    var speed;
    this.acc = function () {
        return speed
    };

    function outputVal(x, y) {
//                    console.log(div.getElementsByTagName("span"))
        div.getElementsByTagName("span")[0].innerText = ((x - d / 2) / (d / 4)).toFixed(2) + "," + ((y - d / 2) / (d / 4)).toFixed(2);
        return [
            Number(((x - d / 2) / (d / 4)).toFixed(2)),
            Number(((y - d / 2) / (d / 4)).toFixed(2))
        ]
    }

    this.run = function () {
        ctx.beginPath();
        ctx.arc(d / 2, d / 2, d / 4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        speed = outputVal(d / 2, d / 2)
    };

    this.bind = function (eventName, eventFn) {
        $(box).on(eventName, eventFn)
    };

    fakeBox.ondrag = function (event) {
        var X = event.clientX - div.offsetLeft;//jq.offset().left
        var Y = event.clientY - div.offsetTop;
        range = Math.sqrt(Math.pow(X - d / 2, 2) + Math.pow(Y - d / 2, 2));
        if (range >= d / 4) {
            var X0 = d * (2 * X - d) / (8 * range);
            var Y0 = d * (2 * Y - d) / (8 * range);
            ctx.clearRect(0, 0, d, d);
            ctx.beginPath();
            ctx.arc(d / 2 + X0, d / 2 + Y0, d / 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            speed = outputVal(d / 2 + X0, d / 2 + Y0, d / 4)
        }
        else {
            ctx.clearRect(0, 0, d, d);
            ctx.beginPath();
            ctx.arc(X, Y, d / 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            speed = outputVal(X, Y)
        }
        $(box).trigger("start", speed);
    };

    fakeBox.ondragend = function () {
        ctx.clearRect(0, 0, d, d);
        ctx.beginPath();
        ctx.arc(d / 2, d / 2, d / 4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        speed = outputVal(d / 2, d / 2);
        $(box).trigger("stop");
    };
}