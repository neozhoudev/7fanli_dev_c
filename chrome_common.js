var qifanli_extension = chrome.extension;
var qifanli_cookies = chrome.cookies;
var qifanli_tabs = chrome.tabs;
var to_ken = "";

function sendInfo(callback, action, param) {


    qifanli_extension.sendRequest({
        "type": "sendinfo",
        "action": action,
        "param": param
    }, function (response) {

        callback(response);

    });

}

function sendMes(callback, url, param) {



    qifanli_extension.sendRequest({
        "type": "sendajaxget",
        "url": url,
        "param": param
    }, function (response) {

        to_ken = response.token;
        callback(response.data);

    });
}

function openTab(callback, url, param) {

    qifanli_extension.sendRequest({
        "type": "openTab",
        "url": url,
        "param": param
    }, function (response) {

    });

}

function sendServer(callback, url, param) {



    qifanli_extension.sendRequest({
        "type": "sendajaxServer",
        "url": url,
        "param": param
    }, function (response) {

        to_ken = response.token;
        callback(response.data, param);

    });
}

function sendMesText(callback, url, param) {

    qifanli_extension.sendRequest({
        "type": "sendajaxgetText",
        "url": url,
        "param": param
    }, function (response) {

        callback(response.data);

    });
}

function postMes(callback, url) {

    qifanli_extension.sendRequest({
        "type": "sendajaxpost",
        "url": url,
        "param": ""
    }, function (response) {

        callback(response.data);

    });


}

function postMesText(callback, url) {

    qifanli_extension.sendRequest({
        "type": "sendajaxposttext",
        "url": url,
        "param": ""
    }, function (response) {

        callback(response.data);

    });


}
