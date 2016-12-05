var jsonData = new Object();
var shopData = new Array();
var itemData = new Array();
var jfbData = new Array();
var token = "";


function isJson(obj) {

    if (obj.indexOf("{") == 0) {
        return true;
    } else {
        return false;
    }
}

if (null == qifanli_cookies) {

    if (window.localStorage) {

        var tab = window.localStorage.tab;

        if (typeof tab == "undefined") {
            qifanli_tabs.create({
                url: "http://7fanli.com/gotestnow.html?frm=ext",
                selected: true
            });
            window.localStorage.tab = "true";
        }

    }
} else {
    qifanli_cookies.get({
        "url": "http://7fanli.com",
        "name": "tab"
    }, function (cookies) {
        var d1 = new Date();
        d1.setFullYear(d1.getFullYear() + 1);
        var tab = window.localStorage.tab;

        if (null == cookies && typeof tab == "undefined") {

            qifanli_tabs.create({
                url: "http://7fanli.com/gotestnow.html?frm=ext",
                selected: true
            });
            window.localStorage.tab = "true";
        }

    });

}



qifanli_extension.onRequest.addListener(
    function (request, sender, sendResponse) {

        if (request.type == "sendajaxServer") {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (xhr.responseText) {

                            var data = xhr.responseText;

                            sendResponse({
                                msg: "ok",
                                data: data
                            });

                        } else {
                            sendResponse({
                                msg: "err"
                            });
                        }

                    } else {
                        sendResponse({
                            msg: "err"
                        });
                    }
                }
            }

            xhr.open('GET', request.url, true);
            xhr.send();

        } else if (request.type == "sendajaxget") {


            if (typeof jsonData[request.param] != "undefined") {
                sendResponse({
                    msg: "ok",
                    data: jsonData[request.param],
                    token: token
                });
            } else {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (data) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (isJson(xhr.responseText)) {

                                var data = JSON.parse(xhr.responseText);

                                switch (request.param) {
                                    case "getGuideUrl":

                                        jsonData["getGuideUrl"] = data;

                                        break;
                                    case "getAdzoneUrl":

                                        jsonData["getAdzoneUrl"] = data;

                                        break;
                                }

                                sendResponse({
                                    msg: "ok",
                                    data: data,
                                    token: token
                                });

                            } else {
                                sendResponse({
                                    msg: "err"
                                });
                            }

                        } else {
                            sendResponse({
                                msg: "err"
                            });
                        }
                    }
                }

                xhr.open('GET', request.url, true);
                xhr.send();
            }
        } else if (request.type == "sendajaxgetText") {

            if (request.param != "" && typeof jfbData[request.param] != "undefined") {
                sendResponse({
                    msg: "ok",
                    data: jfbData[request.param]
                });
            } else {


                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (data) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {


                            var data = xhr.responseText;

                            jfbData[request.param] = data;

                            sendResponse({
                                msg: "ok",
                                data: data
                            });



                        } else {
                            sendResponse({
                                msg: "err"
                            });
                        }
                    }
                }

                xhr.open('GET', request.url, true);
                xhr.send();
            }

        } else if (request.type == "sendajaxpost") {


            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (isJson(xhr.responseText)) {

                            var data = JSON.parse(xhr.responseText);
                            //console.log(data);
                            sendResponse({
                                msg: "ok",
                                data: data
                            });

                        } else {
                            sendResponse({
                                msg: "err"
                            });
                        }

                    } else {
                        sendResponse({
                            msg: "err"
                        });
                    }
                }
            }

            xhr.open('POST', request.url, true);
            xhr.send();

        } else if (request.type == "sendajaxposttext") {


            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {


                        var data = xhr.responseText;
                        //console.log(data);
                        sendResponse({
                            msg: "ok",
                            data: data
                        });


                    } else {
                        sendResponse({
                            msg: "err"
                        });
                    }
                }
            }

            xhr.open('POST', request.url, true);
            xhr.send();

        } else if (request.type == "getcookie") {

            if (window.localStorage) {



                var pos = window.localStorage.pos;
                var aitao = window.localStorage.aitao;
                var msg = [];

                if (typeof pos == "undefined") {
                    msg.push({
                        "pos": "leftb"
                    });


                } else {
                    msg.push({
                        "pos": pos
                    });


                }

                if (typeof aitao == "undefined") {
                    msg.push({
                        "aitao": "open"
                    });


                } else {
                    msg.push({
                        "aitao": aitao
                    });


                }

                sendResponse(msg);

            } else {

                qifanli_cookies.get({
                    "url": "http://www.7fanli.com",
                    "name": "pos"
                }, function (cookies) {


                    if (null == cookies) {


                        sendResponse({
                            msg: "leftb"
                        });
                    } else {
                        sendResponse({
                            msg: cookies.value
                        });
                    }

                });

            }


        } else if (request.type == "setpos") {

            var mark = request.mark;
            window.localStorage.pos = mark;
            sendResponse({
                msg: "ok"
            });

        } else if (request.type == "setaitao") {

            var mark = request.mark;
            window.localStorage.aitao = mark;
            sendResponse({
                msg: "ok"
            });

        } else if (request.type == "setpop") {

            var mark = request.mark;
            window.localStorage.tab = mark;
            sendResponse({
                msg: "ok"
            });

        } else if (request.type == "sendinfo") {

            var info = request.param.split("|");

            if (request.action == "set") {

                //console.log(info);

                if (info[0] != "") {

                    shopData[info[0]] = "yes";

                }

                if (info[1] != "") {

                    itemData[info[1]] = "yes";

                }
                //console.log("h:" + shopData[info[0]]);
                sendResponse({
                    msg: "ok"
                });


            } else if (request.action == "get") {
                //console.log(info);
                //console.log("b:" + shopData[info[0]]);
                //console.log("b:" + itemData[info[1]]);

                if (info[0] != "" && typeof (shopData[info[0]]) != "undefined") {

                    sendResponse({
                        msg: "yes"
                    });

                } else if (info[1] != "" && typeof (itemData[info[1]]) != "undefined") {

                    sendResponse({
                        msg: "yes"
                    });

                } else {
                    sendResponse({
                        msg: "no"
                    });

                }

            } else if (request.action == "clear") {


                jsonData = new Object();

            } else if (request.action == "token") {


                token = request.param;
                //console.log(token);

            }



        }
    }
);
