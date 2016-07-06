/**
 * Created by wslsh on 2016/6/20.
 */
// 时速表 类
function Speedometer(meterBox) {
    this.timeToStop = false;
    this.meter = meterBox;
    this.run = function (acc) {
        timer = setInterval(function () {
            $(meterBox).trigger("speedChange");
//                        console.log(acc)
        }, 20);// todo 20
//                meterBox.value += acc[1]
    };
    this.bind = function (eventName, eventFn) {
        $(meterBox).on(eventName, eventFn)
    };
}