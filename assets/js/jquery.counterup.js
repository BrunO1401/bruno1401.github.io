/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
!function(t) {
    "use strict";
    t.fn.counterUp = function(e) {
        var n = t.extend({
            time: 400,
            delay: 10
        }, e);
        return this.each(function() {
            var e = t(this)
              , u = n
              , a = function() {
                var t = []
                  , n = u.time / u.delay
                  , a = e.text()
                  , r = /[0-9]+,[0-9]+/.test(a);
                a = a.replace(/,/g, "");
                for (var o = (/^[0-9]+$/.test(a),
                /^[0-9]+\.[0-9]+$/.test(a)), c = o ? (a.split(".")[1] || []).length : 0, s = n; s >= 1; s--) {
                    var i = parseInt(a / n * s);
                    if (o && (i = parseFloat(a / n * s).toFixed(c)),
                    r)
                        for (; /(\d+)(\d{3})/.test(i.toString()); )
                            i = i.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    t.unshift(i)
                }
                e.data("counterup-nums", t),
                e.text("0");
                var d = function() {
                    e.text(e.data("counterup-nums").shift()),
                    e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), u.delay) : (delete e.data("counterup-nums"),
                    e.data("counterup-nums", null),
                    e.data("counterup-func", null))
                };
                e.data("counterup-func", d),
                setTimeout(e.data("counterup-func"), u.delay)
            };
            e.waypoint(function(t) {
                a(),
                this.destroy()
            }, {
                offset: "100%"
            })
        })
    }
}(jQuery);
