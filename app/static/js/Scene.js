/**
 * Created by wslsh on 2016/6/20.
 */



function LoginScene() {

    var self = this;
    var $me = $("<div id='_login'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };

    this.createUI = function () {
        var $login_center = $("<div id='_login_center'></div>");
        var $login_center_empty = $("<div id='_login_center_empty'></div>");
        var $login_center_box = $("<div id='_login_center_box'></div>");

        $me.append($("\
        <div id='_login'>\
        <div id='_login_center'>\
            <div id='_login_center_empty'></div>\
            <div id='_login_center_box'>\
            <img src='app/static/img/userNumber.png'>\
            <img src='app/static/img/password.png'>\
            <img src='app/static/img/login_button.png'>\
            <img src='app/static/img/register_button.png'>\
            <input type='text' name='username'>\
            <input type='password' name='password'>\
            </div>\
            </div>\
        "));
        //$("<img src='app/static/img/userNumber.png'/>").appendTo($login_box);
        //
        //$("<img src='app/static/img/password.png'/>").appendTo($login_box);
        //
        //$("<img src='app/static/img/login_button.png'/>")
        //    .click(function () {
        //        alert();
        //        $me.trigger("clickSignButton")
        //    })
        //    .appendTo($login_box);
        //
        //$("<img src='app/static/img/register_button.png'/>")
        //    .click(function () {
        //        alert();
        //        $me.trigger("loginCorrect");
        //    })
        //    .appendTo($login_box);
        //
        //$("<img src='app/static/img/set.png'/>")
        //    .click(function () {
        //        alert();
        //        $me.trigger("clickSettingButton");
        //    }).appendTo($login_box);
        //
        //$("<input type='text' name='username'/>")
        //    .appendTo($login_box);
        //
        //$("<input type='password' name='password'/>").appendTo($login_box);
        //
        //$login_center
        //    .append($login_empty)
        //    .append($login_box);
        //
        //$me
        //    .append($login_center);
    };

    this.bind = function (eventName, eventFn) {
        $me.on(eventName, eventFn)
    };
}


function MainScene() {
    var self = this;
    var $me = $("<div id='_main'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        var $main_box = $("<div id='_main_box'></div>");
        var $main_empty = $("<div id='_main_empty'></div>");
        var $main_box_empty = $("<div id='_main_box_empty'></div>");
        var $main_loading = $("<div id='_main_loading'></div>");

        $me.append($main_empty);

        $main_box
            .append($main_box_empty)
            .append($("<button></button>"))
            .append($("<button></button>"))
            .append($("<button></button>"))
            .append($("<button></button>"))
            .appendTo($me);
    };
}


function GameScene() {
    var self = this;
    var $me = $("<div class='_game'></div>");

    this.mainBody = function () {
        $me
            .append("<h1>加速度上限 1/100ms， 速度上限 100</h1>")
            .append("<meter id='_meterBox' value='0' min='0' max='100'></meter>")
            .append(
            "<div id='_cont_div'>\
                <div draggable='true'></div>\
                <canvas width='100px' height='100px' id='controller'></canvas>\
                <span></span>\
            </div>")
            .append("<div id='_map'><div id='_map_div'></div></div>");
        return $me
    };

    this.run = function () {

        var cnt = new Controller(_cont_div);
        var meter = new Speedometer(_meterBox);
        var road = new Map("app/static/img/map2.jpg", _map);
        var role = new Role([
            "app/static/img/moto/m2.png",
            "app/static/img/biker/c6.png",
            "app/static/img/wheel/w2.png"
        ], _map_div);


        road.run();
        role.run();
        cnt.run();
        meter.run();
        role.move(150, 350);
        meter.bind("speedChange", function () {
            var acc = cnt.acc()[0] <= 0 ? -0.5 : cnt.acc()[0] / 10;
            meter.meter.value += acc;
            $("h1").html("加速度：" + (acc).toFixed(2) + "/10ms，速度：" + (meter.meter.value).toFixed(2));
            road.move(meter.meter.value / 5);
            role.move(meter.meter.value / 5, cnt.acc()[1]);
            role.roll(meter.meter.value)
        });
    }
}
