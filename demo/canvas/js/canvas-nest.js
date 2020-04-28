! function () {
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }

    function getTagName(i) {
        return document.getElementsByTagName(i)
    }

    function l() {
        var scriptTag = getTagName("script"),
            scriptTagLen = scriptTag.length,
            script = scriptTag[scriptTagLen - 1];
        return {
            l: scriptTagLen,
            z: o(script, "zIndex", -1),
            o: o(script, "opacity", 0.8),
            lineColor: o(script, "color", "123,100,53"),
            pointColor: o(script, "color", "23,51,123"),
            n: o(script, "count", 99)
        }
    }

    function setCanvasSize() {
        r = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function b() {
        context.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function (i) {
            i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1,context.fillStyle = "rgba(" + s.pointColor + "," + 1 + ")", context.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, context.beginPath(), context.lineWidth = A / 1, context.strokeStyle = "rgba(" + s.lineColor + "," + (A + 0.2) + ")", context.moveTo(i.x, i.y), context.lineTo(x.x, x.y), context.stroke())
                }
            }
            w.splice(w.indexOf(i), 1)
        }), m(b)
    }
    var canvas = document.createElement("canvas"),
        s = l(),
        c = "c_n" + s.l,
        context = canvas.getContext("2d"),
        r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
            window.setTimeout(i, 1000 / 45)
        },
        randomNum = Math.random,
        f = {
            x: null,
            y: null,
            max: 20000
        };
        canvas.id = c;
        canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
        getTagName("body")[0].appendChild(canvas);
    setCanvasSize(), window.onresize = setCanvasSize;
    window.onmousemove = function (i) {
        i = i || window.event, f.x = i.clientX, f.y = i.clientY
    }, window.onmouseout = function () {
        f.x = null, f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = randomNum() * r,
            g = randomNum() * n,
            q = 2 * randomNum() - 1,
            d = 2 * randomNum() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: 6000
        })
    }
    setTimeout(function () {
        b()
    }, 100)
}();