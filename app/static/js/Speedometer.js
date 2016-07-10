/**
 * Created by wslsh on 2016/6/20.
 */
// 时速表 类
function Speedometer(meterBox) {
    this.timeToStop = false;
    this.meter = meterBox;
    this.run = function (acc) {
        // 暂停
        $("#_game_stop").click(function(){
            clearInterval(timer);
            $("#_game_start").show();
            $(this).hide();

        });

        //继续
        $("#_game_start").click(function(){
            $("#_game_stop").show();
            $(this).hide();
            timer = setInterval(function () {
                $(meterBox).trigger("speedChange",timer);
            }, 20);

        });

        // 计时器
        timer = setInterval(function () {
            $(meterBox).trigger("speedChange",timer);
        }, 20);// todo 20

    };
    this.bind = function (eventName, eventFn) {
        $(meterBox).on(eventName, eventFn)
    };
}