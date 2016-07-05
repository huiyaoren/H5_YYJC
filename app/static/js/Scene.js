/**
 * Created by wslsh on 2016/6/20.
 */


// 登陆界面
function LoginScene() {

    var self = this;
    var $me_init = $("<div id='_login'></div>");
    var $me = $("<div id='_login'></div>");

    this.mainBody = function () {
        this.createUI();
        //console.log($me);
        return $me
    };

    this.createUI = function () {

        $me.append($('\
            <div id="_login_center">\
            <div id="_login_center_empty"></div>\
            <div id="_login_center_box">\
            <img src="app/static/img/userNumber.png">\
            <img src="app/static/img/password.png">\
            <img src="app/static/img/login_button.png">\
            <img src="app/static/img/register_button.png">\
            <form id="loginForm">\
            <input type="text" name="username" placeholder=" 请输入账号">\
            <input type="password" name="password" placeholder=" 请输入密码">\
            </form>\
            </div>\
            </div>\
        '));
        //console.log($me)
    };

    this.bind = function (eventName, eventFn) {
        //$me.on(eventName, eventFn); todo 万恶之源
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {

        var $form = $("#loginForm");

        // 登陆框滑出动画
        $me.children().hide();
        $me.children().slideDown();

        $form.validate({
            rules: {
                username: {
                    required: true,
                    minlength: 6,
                    maxlength: 12
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 12
                }
            },
            // todo 无效
            message: {
                password: {
                    required: "adsfdasfd"
                }
            }
        });

        // 注册
        $(_login_center_box).children("img:eq(3)").click(function () {
            $(document.body).trigger("clickSignButton");
            $me = $("<div id='_login'></div>");
        });

        // 登陆
        $(_login_center_box).children("img:eq(2)").click(function () {
            if ($form.valid()) {
                $(document.body).trigger("loginCorrect", $form);
                $me = $("<div id='_login'></div>");
            }
        });
    }
}

// 注册界面
function SignScene() {

    var self = this;
    var $me = $("<div id='_sign'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };

    this.createUI = function () {

        $me.append('\
            <div id="_sign_center">\
            <div id="_sign_center_empty"></div>\
            <div id="_sign_center_box">\
            <img src="app/static/img/registerBox.png">\
            <img src="app/static/img/registerBox.png">\
            <img src="app/static/img/registerBox.png">\
            <img src="app/static/img/newRegister.png">\
            <img src="app/static/img/reBack.png">\
            <form id="signForm">\
            <input type="text" name="username" placeholder=" 请输入账号">\
            <input type="password" name="password1" placeholder=" 请输入密码">\
            <input type="password" name="password2" placeholder=" 请再次输入密码">\
            </form>\
            </div>\
            </div>\
        ');
    };

    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {

        $me.children().hide();
        $me.children().slideDown();
        var $form = $("#signForm");

        // 返回 登陆界面
        $(_sign_center_box).children("img:eq(4)").click(function () {

            $(document.body).trigger("returnToLogin");
            $me = $("<div id='_sign'></div>");
        });

        // 验证 注册信息
        $("#signForm").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 6,
                    maxlength: 12
                },
                password1: {
                    required: true,
                    minlength: 6,
                    maxlength: 12
                },
                password2: {
                    required: true,
                    equalTo: "[name=password1]"
                }
            },
            // todo 无效
            message: {
                password2: {
                    required: "两次输入不相同"
                }
            }
        });

        // 点击 注册按钮
        $(_sign_center_box).children("img:eq(3)").click(function () {
            if ($("#signForm").valid()) {
                $(document.body).trigger("signSuccess", $form);
                $me = $("<div id='_sign'></div>");
            }
        });
    }
}

// 主界面
function MainScene() {

    var self = this;
    var $me = $("<div id='_main'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };

    this.createUI = function () {
        $me.append('\
            <div id="_main_loading">\
                <div id="_main_loading_empty"></div>\
                    <div id="_main_loading_box">\
                        <img src="app/static/img/wheel/w2.png">\
                        <meter value="0" min="0" max="100"></meter>\
                        <h1>加载中...</h1>\
                    </div>\
                </div>\
                <div id="_main_up">\
                    <button></button>\
                    <button></button>\
                </div>\
                <div id="_main_down">\
                    <button><h1>开始游戏</h1></button>\
                    <button><h1>个人仓库</button>\
                    <button><h1>商店</button>\
                </div>\
            </div>\
        ')
    };

    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {

        var count = 0;
        timer = setInterval(function () {
            if (count < 99) {

                count +=1;
                $(_main_loading_box).children("meter")[0].value += 1;

                var left = Number(
                    $(_main_loading_box)
                        .children("img")
                        .css("left")
                        .slice(0, -2));

                $(_main_loading_box)
                    .children("img")
                    .css("left", left + 740 / 100);// todo 移动距离增量有局限性

                // todo 轮子转动动画
            }
            else if(count >= 99) {
                console.log(count);

                clearInterval(timer);
                $(_main_loading).remove();
                $me = $("<div id='_main'></div>");

            }
        }, 1);


        //点击 返回
        $(_main_up).children("button:eq(0)").click(function () {
            $(document.body).trigger("returnToLogin1");
            $me = $("<div id='_main'></div>")
        });

        //点击 开始
        $(_main_down).children("button:eq(0)").click(function () {
            $(document.body).trigger("clickPlayButton");
            $me = $("<div id='_main'></div>")
        });

        //点击 开始
        $(_main_down).children("button:eq(1)").click(function () {
            $(document.body).trigger("clickStorageButton");
            $me = $("<div id='_main'></div>")
        });

        //  商店入口
        $(_main_down).children("button:eq(2)").click(function () {
            $(document.body).trigger("clickShopButton");
            $me = $("<div id='_main'></div>")
        });
    }

}

// 赛段地图选择界面
function MapScene() {
    var self = this;
    var $me = $("<div id='_map'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        $me.append('\
            <button></button>\
            <div id="_map_empty"></div>\
            <div id="_map_box">\
            <div id="_map_box_map">\
            <div class="_map1">\
            <img src="app/static/img/bigStar0.png">\
            </div>\
            <div class="_map2">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map3">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map4">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map5">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map6">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map7">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map8">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map9">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map10">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            </div>\
            </div>\
        ')
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {

    }
}

// 赛事选择界面
function StageScene() {
    var self = this;
    var $me = $("<div id='_stage'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        $me.append('\
            <button></button>\
            <div id="_stage_box">\
            <div id="_stage_box_empty"></div>\
            <div id="_stage_box_stage">\
            <img src="app/static/img/right.png"/>\
            <img src="app/static/img/left.png"/>\
            <img src="app/static/img/stage/WorldThumbnails1.png" class="_leftStage" data-mark="1"/>\
            <img src="app/static/img/stage/WorldThumbnails2.png" class="_middleStage" data-mark="2"/>\
            <img src="app/static/img/stage/WorldThumbnails3.png" class="_rightStage" data-mark="3"/>\
            <img src="app/static/img/stage/WorldThumbnails4.png" class="_backStage" data-mark="4"/>\
            <img src="app/static/img/stage/WorldThumbnails5.png" class="_backStage" data-mark="5"/>\
            <img src="app/static/img/stage/WorldThumbnails6.png" class="_backStage" data-mark="6"/>\
            <img src="app/static/img/stage/WorldThumbnails7.png" class="_backStage" data-mark="7"/>\
            <img src="app/static/img/stage/WorldThumbnails8.png" class="_backStage" data-mark="8"/>\
            </div>\
            </div>\
        ')
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {
        //  右切换按钮点击事件
        $("img[src='app/static/img/right.png']").click(function () {
            var $middle = $("._middleStage");
            var $left = $("._leftStage");
            var $right = $("._rightStage");
            var num = $middle.attr("data-mark");
            var n1 = (num - 2) > 0 ? num - 2 : num - 2 + 8;
            var $new_left = $("img[data-mark=" + n1 + "]");
            if ($("img:animated").length == 0) {
                $right.animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '31%',
                    'z-index': '5'
                }).hide();
                $middle.animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '49%',
                    'z-index': '5'
                });
                $left.animate({
                    'height': '399px',
                    'top': '0',
                    'left': '21%',
                    'position': 'absolute',
                    'z-index': '10'
                });
                $new_left.show().animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '13%',
                    'z-index': '5'
                });
                $new_left.attr("class", "_leftStage");
                $left.attr("class", "_middleStage");
                $right.attr("class", "_backStage");
                $middle.attr("class", "_rightStage");
            }
        });

        $("img[src='app/static/img/left.png']").click(function () {
            var $middle = $("._middleStage");
            var $left = $("._leftStage");
            var $right = $("._rightStage");
            var num = $middle.attr("data-mark");
            var n2 = (Number(num) + 2) <= 8 ? Number(num) + 2 : Number(num) + 2 - 8;
            console.log(num+" "+n2);
            var $new_right = $("img[data-mark=" + n2 + "]");
            if ($("img:animated").length == 0) {
                $right.animate({
                    'height': '399px',
                    'top': '0',
                    'left': '21%',
                    'position': 'absolute',
                    'z-index': '10'
//
                });
                $middle.animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '13%',
                    'z-index': '5'
//
                });
                $left.animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '31%',
                    'z-index': '5'
                }).hide();
                $new_right.show().animate({
                    'height': '275px',
                    'position': 'absolute',
                    'top': '62px',
                    'left': '49%',
                    'z-index': '5'
                });

                $new_right.attr("class", "_rightStage");
                $left.attr("class", "_backStage");
                $right.attr("class", "_middleStage");
                $middle.attr("class", "_leftStage");
            }
        });

        // todo 返回按钮
    }
}

// 商店
function ShopScene() {
    var self = this;
    var $me = $("<div id='_shop'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        $me.append('\
        <div id="_shop_empty"></div>\
            <div id="_shop_box">\
                <div id="_shop_box_preview">\
                    <img src="app/static/img/effectShow.png">\
                    <h1>Null</h1>\
                    <div></div>\
                    <span>我的金币：999999</span>\
                    <button></button>\
                    <button></button>\
                </div>\
            <div id="_shop_box_shop">\
                <img src="app/static/img/store.png">\
                <img src="app/static/img/item1.png">\
                <img src="app/static/img/item5.png">\
                <img src="app/static/img/item6.png">\
                <img src="app/static/img/item7.png">\
                <img src="app/static/img/exit.png">\
                <div>\
                    <div>\
                        <div class="_shopItem">\
                            <h2>商品名称</h2>\
                            <img src="app/static/img/biker/c1s.png">\
                            <span>价格：9999</span>\
                            <button></button>\
                            <button></button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ')
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {
        var $shop = $("#_shop_box_shop");
        var $preview = $("#_shop_box_preview");

        $(document.body).trigger("LoadShop", [$shop.children("div").children("div"), $preview]);


        // todo 点击后重设按钮样式
        $shop.children("img:gt(0):lt(4)").click(function () {

            //alert(23)

            $($shop.children("img:gt(0):lt(4)"))
                .css("background-image", "none")
                .css("border", "none");

            $(this)
                .css("background-image", "url(app/static/img/login_box.png)")
                .css("background-size", "100% 100%")
                .css("border", "solid 2px black");

        });

        $shop.children("img:eq(1)").click(function () {
            $(document.body).trigger("loadBikerItem");
        });

        $shop.children("img:eq(2)").click(function () {
            $(document.body).trigger("loadMotoItem");
        });

        $shop.children("img:eq(3)").click(function () {
            $(document.body).trigger("loadWheelItem");
        });

        $shop.children("img:eq(4)").click(function () {
            $(document.body).trigger("loadEngineItem");
        });

        $shop.children("img:eq(5)").click(function () {
            $(document.body).trigger("returnToMain");//todo
            $me = $("<div id='_shop'></div>")
        });

        $preview.children("button:eq(0)").click(function(){
            $(document.body).trigger("goToStorage");//todo

        });

        $me = $("<div id='_shop'></div>")



    }
}

// 结算
function ResultScene() {
    var self = this;
    var $me = $("<div id='_result'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        $me.append('\
        <div id="_result_up">\
            <p>\
            <span>难度：3星&nbsp;&nbsp; 金币：120&nbsp; 名次：6</span>\
        <span>总数：9999</span>\
        <span>第四名</span>\
        <span>00:08:09</span>\
        </p>\
        <p>\
        <span>00:08:09</span>\
        <span>00:08:09</span>\
        <span>00:08:09</span>\
        </p>\
        <img src="app/static/img/biker/cha2.png">\
            <img src="app/static/img/biker/cha3.png">\
            <img src="app/static/img/biker/cha4.png">\
            <img src="app/static/img/biker/cha5.png">\
            </div>\
            <div id="_result_down">\
            <button></button>\
            <button></button>\
            <button></button>\
            </div>\
        ')
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {

    }
}

// 仓库
function RepertorytScene() {
    var self = this;
    var $me = $("<div id='_repertory'></div>");

    this.mainBody = function () {
        this.createUI();
        return $me
    };
    this.createUI = function () {
        $me.append('\
        <div id="_repertory_empty"></div>\
            <div id="_repertory_box">\
            <div id="_repertory_box_preview">\
            <img src="app/static/img/effectShow.png">\
            <div></div>\
            <span>加速性能：999999</span>\
        <span>最大速度：999999</span>\
        <span>转向扭矩：999999</span>\
        <span>技能：999999</span>\
        <button></button>\
        </div>\
        <div id="_repertory_box_shop">\
            <img src="app/static/img/entrepot.png">\
            <img src="app/static/img/item1.png">\
            <img src="app/static/img/item5.png">\
            <img src="app/static/img/item6.png">\
            <img src="app/static/img/item7.png">\
            <div>\
            <div>\
            <div class="_shopItem">\
            <h2>商品名称</h2>\
            <img src="app/static/img/biker/c1s.png">\
            <span>价格：9999</span>\
        <button></button>\
        <button></button>\
        </div>\
        </div>\
        </div>\
        </div>\
        </div>\
        ')
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {
        var $shop = $("#_repertory_box_shop");
        var $preview = $("#_repertory_box_preview");



        $shop.children("img:gt(0):lt(4)").click(function () {

            //alert(23)

            $($shop.children("img:gt(0):lt(4)"))
                .css("background-image", "none")
                .css("border", "none");

            $(this)
                .css("background-image", "url(app/static/img/login_box.png)")
                .css("background-size", "100% 100%")
                .css("border", "solid 2px black");

        });



        // 载入
        $("#_repertory_box_shop >img:eq(1)").load(function(){
            $shop.children("div").children("div").empty();
            console.log($preview);
            $(document.body).trigger("loadStorage", [$shop.children("div").children("div"), $preview]);
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_preview > button").click(function(){
            $(document.body).trigger("returnToMain_2");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(1)").click(function(){
            $(document.body).trigger("loadUserRole");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(2)").click(function(){
            $(document.body).trigger("loadUserMoto");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(3)").click(function(){
            $(document.body).trigger("loadUserWheel");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(4)").click(function(){
            $(document.body).trigger("loadUserEngine");
            $me = $("<div id='_repertory'></div>");
        });
    }
}

// todo 游戏界面
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
