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
        $me = $("<div id='_main'></div>");
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
                    <button><h1>作者信息</h1></button>\
                    <button><h1>商店</h1></button>\
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

                count += 1;
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
            else if (count >= 99) {
                console.log(count);

                clearInterval(timer);
                $(_main_loading).remove();
                $me = $("<div id='_main'></div>");

            }
        }, 1);


        //点击 返回
        $(_main_up).children("button:eq(0)").click(function () {
            var conform = confirm("确认退出登录？");
            if (conform) {
                $(document.body).trigger("returnToLogin1");

            }
        });

        //点击 开始
        $(_main_down).children("button:eq(0)").click(function () {
            $(document.body).trigger("clickPlayButton");
        });

        //点击 关于
        $(_main_down).children("button:eq(1)").click(function () {
            alert("作者信息：HF160409 | 版本号：v0.1");
            //$(document.body).trigger("clickStorageButton");
        });

        //  商店入口
        $(_main_down).children("button:eq(2)").click(function () {
            $(document.body).trigger("clickShopButton");
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
        $me = $("<div id='_map'></div>");
        $me.append('\
            <button></button>\
            <div id="_map_empty"></div>\
            <div id="_map_box">\
            <div id="_map_box_map">\
            <div class="_map1" data-map="1">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map2" data-map="2">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map3" data-map="3">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map4" data-map="4">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map5" data-map="5">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map6" data-map="6">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map7" data-map="7">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map8" data-map="8">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map9" data-map="9">\
            <img src="app/static/img/bigStar0.png">\
            <img src="app/static/img/locked.png">\
            </div>\
            <div class="_map10" data-map="10">\
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

        // 初始化
        $("img:eq(0)").load(function () {
            $(document.body).trigger("loadMapScene", $("#_map_box_map"))
        });

        // 选择赛段
        $("#_map_box_map").children().click(function () {
            if ($(this).children("img:eq(1):visible").length == 0) {
                var map_num = $(this).attr("data-map");
                $(document.body).trigger("clickMap", [$("#_map_box_map"), map_num])
            } else {
                alert("关卡未解锁")
            }
        });

        // 返回按钮
        $("#_map").children("button").click(function () {
            $(document.body).trigger("returnToStage")
        });


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
        $me = $("<div id='_stage'></div>");

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
            //console.log(num + " " + n2);
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

        // 返回按钮
        $("#_stage >button").click(function () {
            $(document.body).trigger("returnToMain_3")
        });

        // 选择赛段
        $("[class*=Stage]").click(function () {

            // 判断是否为中间图片
            if ($(this).attr("class") == "_middleStage") {
                $(document.body).trigger("chooseStage", $(this).attr("data-mark"));
                // todo localStorage !!!
            }
        })


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

        $preview.children("button:eq(0)").click(function () {
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
        $me = $("<div id='_result'></div>");
        $me.append('\
        <div id="_result_up">\
            <p>\
            <span>难度：3星&nbsp;&nbsp; 金币：120&nbsp; 名次：6</span>\
        <span>总数：9999</span>\
        <span>第4名</span>\
        <span>00:08:09</span>\
        <span>第1名</span>\
        <span>第2名</span>\
        <span>第3名</span>\
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
        ');
    };
    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {
        var timeCount = JSON.parse(localStorage.result_timeCount);
        var userUsing = JSON.parse(localStorage.userUsing);
        var roleRank = JSON.parse(localStorage.result_roleRank);

        var $result_up = $("#_result_up");
        $result_up
            .children("p:eq(0)")
            .children("span:eq(0)")
            .html("难度：" + (4 - roleRank) + "星&nbsp;&nbsp; 金币：" + localStorage.result_coinCount + "&nbsp; 名次：" + localStorage.result_roleRank);
        $result_up
            .children("p:eq(0)")
            .children("span:eq(1)")
            .html("总数: " + localStorage.userCoin);
        $result_up
            .children("p:eq(0)")
            .children("span:gt(1)").hide();


        if (roleRank == 1) {
            $result_up
                .children("p:eq(0)")
                .children("span:eq(4)").show();
            $result_up
                .children("p:eq(1)").children("span:eq(1)").html("00:" + num_time(timeCount));
            $result_up
                .children("p:eq(1)").children("span:eq(0)").html("00:00:28");
            $result_up
                .children("p:eq(1)").children("span:eq(2)").html("00:00:29");
            $result_up
                .children("img:eq(1)").attr("src", "app/static/img/biker/cha" + userUsing[0] + ".png");
        }
        else if (roleRank == 2) {
            $result_up
                .children("p:eq(0)")
                .children("span:eq(5)").show();
            $result_up
                .children("p:eq(1)").children("span:eq(1)").html("00:00:28");
            $result_up
                .children("p:eq(1)").children("span:eq(0)").html("00:" + num_time(timeCount));
            $result_up
                .children("p:eq(1)").children("span:eq(2)").html("00:00:29");
            $result_up
                .children("img:eq(0)").attr("src", "app/static/img/biker/cha" + userUsing[0] + ".png");
        }
        else if (roleRank == 3) {
            $result_up
                .children("p:eq(0)")
                .children("span:eq(6)").show();
            $result_up
                .children("p:eq(1)").children("span:eq(1)").html("00:00:28");
            $result_up
                .children("p:eq(1)").children("span:eq(0)").html("00:00:29");
            $result_up
                .children("p:eq(1)").children("span:eq(2)").html("00:" + num_time(timeCount));
            $result_up
                .children("img:eq(2)").attr("src", "app/static/img/biker/cha" + userUsing[0] + ".png");
        }
        else if (roleRank == 4) {
            $result_up
                .children("p:eq(0)")
                .children("span:eq(2)").show();
            $result_up
                .children("p:eq(0)")
                .children("span:eq(3)").show().html("00:" + num_time(timeCount));
            $result_up
                .children("p:eq(1)").children("span:eq(1)").html("00:00:28");
            $result_up
                .children("p:eq(1)").children("span:eq(0)").html("00:00:28");
            $result_up
                .children("p:eq(1)").children("span:eq(2)").html("00:00:35");
            $result_up
                .children("img:eq(3)").attr("src", "app/static/img/biker/cha" + userUsing[0] + ".png");
        }

        // todo 修改存档
        $("img:eq(0)").load(function () {
            $(document.body).trigger("changeRecord", roleRank);
        });

        $("#_result_down").children("button:eq(0)").click(function () {
            $(document.body).trigger("restartGame");
        });
        $("#_result_down").children("button:eq(1)").click(function () {
            $(document.body).trigger("returnToMain_4");
        });
        $("#_result_down").children("button:eq(2)").click(function () {
            if (roleRank > 3) {
                alert("关卡未解锁")

            } else if (roleRank <= 3) {

                localStorage.mapNum = JSON.parse(localStorage.mapNum) + 1;

                if (localStorage.mapNum > 10) {
                    localStorage.mapNum = 1;
                    localStorage.stageNum = JSON.parse(localStorage.stageNum) + 1;
                    if (localStorage.stageNum == 8) {
                        alert("已是最后一关");
                        return null
                    }
                    $(document.body).trigger("restartGame");
                }
                else if (localStorage.mapNum <= 10) {
                    $(document.body).trigger("restartGame");
                }

            }

        });


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
        $me = $("<div id='_repertory'></div>")
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
        $("#_repertory_box_shop >img:eq(1)").load(function () {
            $shop.children("div").children("div").empty();
            console.log($preview);
            $(document.body).trigger("loadStorage", [$shop.children("div").children("div"), $preview]);
            $me = $("<div id='_repertory'></div>");
        });

        if (localStorage.gameReady == "true") {
            $("#_repertory_box_preview > button").css("background-image", "url(app/static/img/startGame.png)").click(function () {
                $(document.body).trigger("goToGame");
            });
        } else if (localStorage.gameReady == "false") {
            $("#_repertory_box_preview > button").click(function () {
                $(document.body).trigger("returnToMain_2");
            });
        }


        $("#_repertory_box_shop >img:eq(1)").click(function () {
            $(document.body).trigger("loadUserRole");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(2)").click(function () {
            $(document.body).trigger("loadUserMoto");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(3)").click(function () {
            $(document.body).trigger("loadUserWheel");
            $me = $("<div id='_repertory'></div>");
        });

        $("#_repertory_box_shop >img:eq(4)").click(function () {
            $(document.body).trigger("loadUserEngine");
            $me = $("<div id='_repertory'></div>");
        });
    }
}

// todo 游戏界面
function GameScene() {
    var self = this;
    var $me = $("<div id='_game'></div>");

    this.mainBody = function () {
        $me = $("<div id='_game'></div>");
        $me
            .append('\
            <div id="_game_rank">\
            <div></div>\
            </div>\
            <div id="_game_timer">\
            <span>1-1</span>\
            <span>00:00</span>\
        </div>\
        <div id="_game_coin">\
            <span>+0</span>\
            </div>\
            <div id="_game_speedometer">\
            <div></div>\
            </div>\
            <button id="_game_stop"></button>\
            <button id="_game_start"></button>\
            <h1>加速度上限 1/100ms， 速度上限 100</h1>\
        <meter id="meterBox" value="0" min="0" max="100"></meter>\
            <div id="cont_div">\
            <div draggable="true"></div>\
            <canvas width="100px" height="100px" id="controller"></canvas>\
            <span></span>\
            </div>\
            <div id="road">\
            <div id="scene_div"></div>\
            </div>\
            <div id="_countdown">\
            <div id="_countdown_empty"></div>\
            <div id="_countdown_body">\
            <span></span>\
            </div>\
            </div>\
            ');
        return $me
    };


    this.bind = function (eventName, eventFn) {
        $(document.body).on(eventName, eventFn)
    };

    this.run = function () {
        var cnt = new Controller($("#cont_div")[0], 50, 20);
        var meter = new Speedometer(meterBox);
        var role = new Role([
            "app/static/img/moto/m" + (JSON.parse(localStorage.userUsing)[1] - 100) + ".png",
            "app/static/img/biker/c" + (JSON.parse(localStorage.userUsing)[0]) + ".png",
            "app/static/img/wheel/w" + (JSON.parse(localStorage.userUsing)[2] - 200) + ".png"
        ], scene_div);
        var role_1 = new Role([
            "app/static/img/moto/m2.png",
            "app/static/img/biker/c5.png",
            "app/static/img/wheel/w2.png"
        ], scene_div);
        var role_2 = new Role([
            "app/static/img/moto/m2.png",
            "app/static/img/biker/c6.png",
            "app/static/img/wheel/w2.png"
        ], scene_div);
        var role_3 = new Role([
            "app/static/img/moto/m2.png",
            "app/static/img/biker/c7.png",
            "app/static/img/wheel/w2.png"
        ], scene_div);

        var road = new Road("app/static/img/map" + localStorage.stageNum + ".jpg", $("#road"));


        road.run();
        var road_width = road.size()[0];
        var road_height = road.size()[1];


        // 生成冰面 每10%
        var ice_position_list = [];
        for (var i = 0; i < 3; i++) {
            var ice = new Ice($("#scene_div"));
            var random_y = Math.floor(Math.random() * 5);
            var ice_x = road_width * 0.1 + i * road_width * 0.1;
            var ice_y = road_height * (0.5 + random_y * 0.1);
            ice.run();
            ice.move(ice_x, ice_y);
            ice_position_list.push(ice.position())
        }

        // 生成沙堆 每5%
        var sand_position_list = [];
        for (var i = 0; i < 6; i++) {
            var sand = new Sand($("#scene_div"));
            var random_y = Math.floor(Math.random() * 5);
            var sand_x = road_width * 0.1 + i * road_width * 0.05;
            var sand_y = road_height * (0.5 + random_y * 0.1);
            sand.run();
            sand.move(sand_x, sand_y);
            sand_position_list.push(sand.position())
        }
        console.log(sand_position_list)


        // 生成金币 每1%
        // 以 road_width 的 1% 为基本单位
        var coin_position_list = [];
        for (var i = 0; i < 30; i++) {
            var coin = new Coin($("#scene_div"));
            var random_y = Math.floor(Math.random() * 5);
            //console.log(random_y) // todo 重构一个生成随机数的函数
            var coin_x = road_width * 0.1 + i * road_width * 0.01;
            var coin_y = road_height * (0.45 + random_y * 0.1035);

            coin.run();
            coin.move(coin_x, coin_y);
            coin_position_list.push(coin.position())
        }
        var $coin = $("._coin");
        // (10% + 1% * 30)(42% 52% 62.3% 73.2% 83.4%)


        // 生成木桶 每2%
        var barrel_position_list = [];
        for (var i = 0; i < 15; i++) {
            var barrel = new Barrel($("#scene_div"));
            var random_y = Math.floor(Math.random() * 5);
            //console.log(random_y) // todo 重构一个生成随机数的函数
            var barrel_x = road_width * 0.1 + i * road_width * 0.02;
            var barrel_y = road_height * (0.45 + random_y * 0.1035);

            barrel.run();
            barrel.move(barrel_x, barrel_y);
            barrel_position_list.push(barrel.position())
        }


        role.run();
        role.move(road_width * 0.005, road_height * 0.42);

        role_1.run();
        role_1.move(road_width * 0.005, road_height * 0.52);

        role_2.run();
        role_2.move(road_width * 0.005, road_height * 0.623);

        role_3.run();
        role_3.move(road_width * 0.005, road_height * 0.732); // todo 150改size百分比

        //role_4.run();
        //role_4.move(road_width * 0.005, road_height * 0.834);

        cnt.run();

        meter.run();


        // todo 倒计时 settimeout
        setTimeout(function () {
            $("#_countdown_body").children("span").show().empty().html("倒计时");
        }, 2000);
        setTimeout(function () {
            $("#_countdown_body").children("span").empty().html("3");
        }, 3000);
        setTimeout(function () {
            $("#_countdown_body").children("span").empty().html("2");
        }, 4000);
        setTimeout(function () {
            $("#_countdown_body").children("span").empty().html("1");
        }, 5000);
        setTimeout(function () {
            $("#_countdown_body").children("span").empty().hide();
            game_begin()
        }, 0);// todo 6

        function game_begin() {
            var speed_x_1 = 0;
            var speed_x_2 = 0;
            var speed_x_3 = 0;
            //var speed_x_4 = 0;
            var time_count = 0;
            var coin_count = 0;


            function begin(timer) {
                var max_speed = localStorage.max_speed;
                var max_acc = localStorage.max_acc;
                var speed_y = localStorage.speed_y * 5;

                var road_width = road.size()[0];
                var road_height = road.size()[1];
                var cnt_x = cnt.acc()[0];
                var cnt_y = cnt.acc()[1];
                var role_position = role.position();
                var ai_position_list = [
                    role_1.position(),
                    role_2.position(),
                    role_3.position()
                    //role_4.position()
                ];
                var acc = cnt_x <= 0 ? -0.5 : cnt_x * (max_acc / 100) / 10;
                var speed_per = meter.meter.value += acc;
                var speed_x = speed_per < 0 ? 0 : speed_per * (max_speed / 100);


                // 判断是否到达边界 限制车手移动范围 todo 障碍物影响速度
                if (
                    (role_position[1] <= 0.38 * road_height && cnt_y < 0) ||
                    (role_position[1] >= 0.86 * road_height && cnt_y > 0)
                ) {
                    role.move(speed_x / 5, 0);
                } else {
                    role.move(speed_x / 5, cnt_y * (speed_y / 100));
                }
                role.roll(speed_x);


                // todo 碰撞
                if (role_position[0] + 128 >= road_width * 0.1 && role_position[0] + 128 < road_width * 0.4) {
                    var road_break_x = parseInt((role_position[0] + 128 - road_width * 0.1) / (road_width * 0.01));
                    console.log(road_break_x);

                    // todo 与金币体积对比
                    var coin_x = coin_position_list[road_break_x][0];
                    var coin_y = coin_position_list[road_break_x][1];
                    var role_x = role_position[0] + 89 + 59 + 20;
                    var role_y = role_position[1] + 25;
                    var barrel_x = barrel_position_list[Math.floor(road_break_x / 2)][0];
                    var barrel_y = barrel_position_list[Math.floor(road_break_x / 2)][1];
                    var sand_x = sand_position_list[Math.floor(road_break_x / 5)][0];
                    var sand_y = sand_position_list[Math.floor(road_break_x / 5)][1];
                    var ice_x = ice_position_list[Math.floor(road_break_x / 10)][0];
                    var ice_y = ice_position_list[Math.floor(road_break_x / 10)][1];


                    // 碰撞
                    // bug 第一个金币/桶无效 解决 【车身长度+128后判断条件未改 导致数组下标越界】
                    if (
                        role_x > coin_x && role_x < coin_x + 60 && role_y > coin_y && role_y < coin_y + 60 ||
                        role_x > coin_x && role_x < coin_x + 60 && role_y + 49 > coin_y && role_y + 49 < coin_y + 60
                    ) {
                        // 判断 金币是否显示
                        if ($($coin[road_break_x]).css("display") != "none") {
                            coin_count++;
                            $("#_game_coin").children("span").html("+" + coin_count);
                        }
                        $($coin[road_break_x]).hide();
                        //return // 选择时机return是否能提高性能？？
                    }

                    // todo 桶碰撞
                    if (
                        role_x > barrel_x && role_x < barrel_x + 105 && role_y > barrel_y && role_y < barrel_y + 70 ||
                        role_x > barrel_x && role_x < barrel_x + 105 && role_y + 49 > barrel_y && role_y + 49 < barrel_y + 70
                    ) {
                        //meter.meter.value = 0;
                    }

                    //todo 障碍物 水
                    if (
                        ice_x + 1530 > role_x && ice_x < role_x && ice_y + 150 > role_y && ice_y < role_y ||
                        ice_x + 1530 > role_x && ice_x < role_x && ice_y + 150 > role_y + 49 && ice_y + 150 < role_y + 49
                    ) {
                        //console.log("ice");
                        meter.meter.value += 0.5;
                    }

                    //todo 障碍物 沙
                    if (
                        sand_x + 629 > role_x && sand_x < role_x && sand_y + 114 > role_y && sand_y < role_y ||
                        sand_x + 629 > role_x && sand_x < role_x && sand_y + 114 > role_y + 49 && ice_y < role_y + 49
                    ) {
                        //console.log("sand");
                        meter.meter.value -= 0.25;
                    }
                }

                // 道路移动
                road.move(speed_x / 5);


                // 角色数据
                //console.log("速度：" + (speed_x / 100) * max_speed);
                //console.log("加速：" + acc);
                //console.log("转向：" + cnt_y);


                // 电脑
                if (speed_x_1 < 50) {
                    speed_x_1 += 0.05;
                }
                role_1.move(speed_x_1 / 5);
                role_1.roll(speed_x_1);

                if (speed_x_2 < 40) {
                    speed_x_2 += 0.06;
                }
                role_2.move(speed_x_2 / 5);
                role_2.roll(speed_x_2);

                if (speed_x_3 < 30) {
                    speed_x_3 += 0.07;
                }
                role_3.move(speed_x_3 / 5);
                role_3.roll(speed_x_3);

                //if (speed_x_4 < 20) {
                //    speed_x_4 += 0.08;
                //}
                //role_4.move(speed_x_4 / 5);
                //role_4.roll(speed_x_4);


                // 速度计
                $("#_game_speedometer").children("div").css("width", speed_per + "%");


                // 计时器 clock
                $("#_game_timer").children("span:eq(0)").html(localStorage.stageNum + "-" + localStorage.mapNum);
                time_count += 1;
                $("#_game_timer").children("span:eq(1)").html(num_time(time_count));


                // 排名
                // 把总行驶距离列表排序, for 循环查找用户角色行驶距离
                var role_rank = 4;
                for (var i = 0; i < ai_position_list.length; i++) {
                    if (role_position[0] > ai_position_list[i][0]) {
                        role_rank -= 1;
                    }
                }
                //console.log("rank: "+role_rank);
                $("#_game_rank").children("div").css("background-image", "url(app/static/img/" + role_rank + ".png)");


//                $("h1").html("加速度：" + (acc).toFixed(2) + "/10ms，速度：" + (meter.meter.value).toFixed(2));

                //console.log("角色坐标|游戏: " + role.position());
                //console.log("地图尺寸|游戏: " + [road_width, road_height]);

                // 到达终点
                if (role.position()[0] > road_width * 0.85 / 2) {
                    // todo 跳转结算页面
                    // todo 记录排名 role_rank、获得金币数coin_count、用时 num_time(time_count)
                    // todo 修改用户存档、金币
                    //alert("游戏结束");
                    localStorage.result_roleRank = role_rank;
                    localStorage.result_coinCount = coin_count;
                    localStorage.result_timeCount = time_count;
                    localStorage.userCoin = JSON.parse(localStorage.userCoin) + coin_count;
                    clearInterval(timer);
                    $(document.body).trigger("goToResult");
                }
            }

            meter.bind("speedChange", function (e, timer) {
                begin(timer);
            });
        }
    }
}


function num_str(num) {
    if (num < 10) {
        num = "0" + num
    }
    return num
}

function num_time(time) {
    time = time / 50;
    var min = num_str(parseInt(time / 60));
    var sec = num_str(parseInt(time % 60));
    return min + ":" + sec;
}
