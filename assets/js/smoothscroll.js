//
// SmoothScroll for websites v1.4.0 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//

!function() {
    function e() {
        z.keyboardSupport && m("keydown", a)
    }
    function t() {
        if (!A && document.body) {
            A = !0;
            var t = document.body
              , o = document.documentElement
              , n = window.innerHeight
              , r = t.scrollHeight;
            if (B = document.compatMode.indexOf("CSS") >= 0 ? o : t,
            D = t,
            e(),
            top != self)
                X = !0;
            else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + B.scrollHeight + "px",
                document.body.appendChild(a);
                var i;
                T = function() {
                    i || (i = setTimeout(function() {
                        L || (a.style.height = "0",
                        a.style.height = B.scrollHeight + "px",
                        i = null)
                    }, 500))
                }
                ,
                setTimeout(T, 10),
                m("resize", T);
                var l = {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                };
                if (M = new V(T),
                M.observe(t, l),
                B.offsetHeight <= n) {
                    var c = document.createElement("div");
                    c.style.clear = "both",
                    t.appendChild(c)
                }
            }
            z.fixedBackground || L || (t.style.backgroundAttachment = "scroll",
            o.style.backgroundAttachment = "scroll")
        }
    }
    function o() {
        M && M.disconnect(),
        h(I, r),
        h("mousedown", i),
        h("keydown", a),
        h("resize", T),
        h("load", t)
    }
    function n(e, t, o) {
        if (p(t, o),
        1 != z.accelerationMax) {
            var n = Date.now()
              , r = n - R;
            if (r < z.accelerationDelta) {
                var a = (1 + 50 / r) / 2;
                a > 1 && (a = Math.min(a, z.accelerationMax),
                t *= a,
                o *= a)
            }
            R = Date.now()
        }
        if (q.push({
            x: t,
            y: o,
            lastX: 0 > t ? .99 : -.99,
            lastY: 0 > o ? .99 : -.99,
            start: Date.now()
        }),
        !P) {
            var i = e === document.body
              , l = function(n) {
                for (var r = Date.now(), a = 0, c = 0, u = 0; u < q.length; u++) {
                    var d = q[u]
                      , s = r - d.start
                      , f = s >= z.animationTime
                      , m = f ? 1 : s / z.animationTime;
                    z.pulseAlgorithm && (m = x(m));
                    var h = d.x * m - d.lastX >> 0
                      , w = d.y * m - d.lastY >> 0;
                    a += h,
                    c += w,
                    d.lastX += h,
                    d.lastY += w,
                    f && (q.splice(u, 1),
                    u--)
                }
                i ? window.scrollBy(a, c) : (a && (e.scrollLeft += a),
                c && (e.scrollTop += c)),
                t || o || (q = []),
                q.length ? _(l, e, 1e3 / z.frameRate + 1) : P = !1
            };
            _(l, e, 0),
            P = !0
        }
    }
    function r(e) {
        A || t();
        var o = e.target
          , r = u(o);
        if (!r || e.defaultPrevented || e.ctrlKey)
            return !0;
        if (w(D, "embed") || w(o, "embed") && /\.pdf/i.test(o.src) || w(D, "object"))
            return !0;
        var a = -e.wheelDeltaX || e.deltaX || 0
          , i = -e.wheelDeltaY || e.deltaY || 0;
        return K && (e.wheelDeltaX && b(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))),
        e.wheelDeltaY && b(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))),
        a || i || (i = -e.wheelDelta || 0),
        1 === e.deltaMode && (a *= 40,
        i *= 40),
        !z.touchpadSupport && v(i) ? !0 : (Math.abs(a) > 1.2 && (a *= z.stepSize / 120),
        Math.abs(i) > 1.2 && (i *= z.stepSize / 120),
        n(r, a, i),
        e.preventDefault(),
        void l())
    }
    function a(e) {
        var t = e.target
          , o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== N.spacebar;
        document.contains(D) || (D = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i
          , a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (r.test(t.nodeName) || w(t, "input") && !a.test(t.type) || w(D, "video") || y(e) || t.isContentEditable || e.defaultPrevented || o)
            return !0;
        if ((w(t, "button") || w(t, "input") && a.test(t.type)) && e.keyCode === N.spacebar)
            return !0;
        var i, c = 0, d = 0, s = u(D), f = s.clientHeight;
        switch (s == document.body && (f = window.innerHeight),
        e.keyCode) {
        case N.up:
            d = -z.arrowScroll;
            break;
        case N.down:
            d = z.arrowScroll;
            break;
        case N.spacebar:
            i = e.shiftKey ? 1 : -1,
            d = -i * f * .9;
            break;
        case N.pageup:
            d = .9 * -f;
            break;
        case N.pagedown:
            d = .9 * f;
            break;
        case N.home:
            d = -s.scrollTop;
            break;
        case N.end:
            var m = s.scrollHeight - s.scrollTop - f;
            d = m > 0 ? m + 10 : 0;
            break;
        case N.left:
            c = -z.arrowScroll;
            break;
        case N.right:
            c = z.arrowScroll;
            break;
        default:
            return !0
        }
        n(s, c, d),
        e.preventDefault(),
        l()
    }
    function i(e) {
        D = e.target
    }
    function l() {
        clearTimeout(E),
        E = setInterval(function() {
            F = {}
        }, 1e3)
    }
    function c(e, t) {
        for (var o = e.length; o--; )
            F[j(e[o])] = t;
        return t
    }
    function u(e) {
        var t = []
          , o = document.body
          , n = B.scrollHeight;
        do {
            var r = F[j(e)];
            if (r)
                return c(t, r);
            if (t.push(e),
            n === e.scrollHeight) {
                var a = s(B) && s(o)
                  , i = a || f(B);
                if (X && d(B) || !X && i)
                    return c(t, $())
            } else if (d(e) && f(e))
                return c(t, e)
        } while (e = e.parentElement)
    }
    function d(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }
    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }
    function f(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }
    function m(e, t) {
        window.addEventListener(e, t, !1)
    }
    function h(e, t) {
        window.removeEventListener(e, t, !1)
    }
    function w(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    function p(e, t) {
        e = e > 0 ? 1 : -1,
        t = t > 0 ? 1 : -1,
        (Y.x !== e || Y.y !== t) && (Y.x = e,
        Y.y = t,
        q = [],
        R = 0)
    }
    function v(e) {
        return e ? (O.length || (O = [e, e, e]),
        e = Math.abs(e),
        O.push(e),
        O.shift(),
        clearTimeout(H),
        H = setTimeout(function() {
            window.localStorage && (localStorage.SS_deltaBuffer = O.join(","))
        }, 1e3),
        !g(120) && !g(100)) : void 0
    }
    function b(e, t) {
        return Math.floor(e / t) == e / t
    }
    function g(e) {
        return b(O[0], e) && b(O[1], e) && b(O[2], e)
    }
    function y(e) {
        var t = e.target
          , o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch"))
            do
                if (o = t.classList && t.classList.contains("html5-video-controls"))
                    break;
            while (t = t.parentNode);
        return o
    }
    function S(e) {
        var t, o, n;
        return e *= z.pulseScale,
        1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1),
        e -= 1,
        n = 1 - Math.exp(-e),
        t = o + n * (1 - o)),
        t * z.pulseNormalize
    }
    function x(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)),
        S(e))
    }
    function k(e) {
        for (var t in e)
            C.hasOwnProperty(t) && (z[t] = e[t])
    }
    var D, M, T, E, H, C = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !1,
        fixedBackground: !0,
        excluded: ""
    }, z = C, L = !1, X = !1, Y = {
        x: 0,
        y: 0
    }, A = !1, B = document.documentElement, O = [], K = /^Mac/.test(navigator.platform), N = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    }, q = [], P = !1, R = Date.now(), j = function() {
        var e = 0;
        return function(t) {
            return t.uniqueID || (t.uniqueID = e++)
        }
    }(), F = {};
    window.localStorage && localStorage.SS_deltaBuffer && (O = localStorage.SS_deltaBuffer.split(","));
    var I, _ = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        }
    }(), V = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, $ = function() {
        var e;
        return function() {
            if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "height:10000px;width:1px;",
                document.body.appendChild(t);
                var o = document.body.scrollTop;
                document.documentElement.scrollTop;
                window.scrollBy(0, 3),
                e = document.body.scrollTop != o ? document.body : document.documentElement,
                window.scrollBy(0, -3),
                document.body.removeChild(t)
            }
            return e
        }
    }(), U = window.navigator.userAgent, W = /Edge/.test(U), G = /chrome/i.test(U) && !W, J = /safari/i.test(U) && !W, Q = /mobile/i.test(U), Z = (G || J) && !Q;
    "onwheel"in document.createElement("div") ? I = "wheel" : "onmousewheel"in document.createElement("div") && (I = "mousewheel"),
    I && Z && (m(I, r),
    m("mousedown", i),
    m("load", t)),
    k.destroy = o,
    window.SmoothScrollOptions && k(window.SmoothScrollOptions),
    "function" == typeof define && define.amd ? define(function() {
        return k
    }) : "object" == typeof exports ? module.exports = k : window.SmoothScroll = k
}();
