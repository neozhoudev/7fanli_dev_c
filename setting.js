(function () {

    if (location.href.indexOf("setting.html") != -1) {

        var posreg = document.getElementById("posreg").getElementsByTagName("a");
        for (var i = 0; i < posreg.length; i++) {

            posreg[i].addEventListener("click", function () {

                var mark = this.getAttribute("mark");


                qifanli_extension.sendRequest({
                    "type": "setpos",
                    "mark": mark
                }, function (response) {



                });

            });



        }

        var jumpreg = document.getElementById("jumpreg").getElementsByTagName("a");

        for (var i = 0; i < jumpreg.length; i++) {

            jumpreg[i].addEventListener("click", function () {

                var mark = this.getAttribute("mark");
                qifanli_extension.sendRequest({
                    "type": "setaitao",
                    "mark": mark
                }, function (response) {



                });

            });

        }


    } else if (location.href.indexOf("gotestnow.html") != -1) {

        qifanli_extension.sendRequest({
            "type": "setpop",
            "mark": "true"
        }, function (response) {



        });

    }

})();
