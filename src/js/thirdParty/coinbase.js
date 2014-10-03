((function() {
    //  TODO: I'm just placating requireJS here. There's gotta be a better solution at some point.
    window.Coinbase = true;
    (function() {
        var e;
        (e = function(e, t, a, n) {
            var o, r, i, s, c, d, l, m, u, _;
            return _ = [null, null, !1], i = _[0], r = _[1], d = _[2], (i = e.jQuery) && (m = parseInt(a.split(".")[0]) || 0, u = parseInt(a.split(".")[1]) || 0, s = parseInt(i.fn.jquery.split(".")[0]) || 0, c = parseInt(i.fn.jquery.split(".")[1]) || 0, o = s > m || s === m && c >= u), i && o && !n(i, d) ? void 0 : (l = t.createElement("script"), l.type = "text/javascript", l.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", l.onload = l.onreadystatechange = function() { return d || (r = this.readyState) && "loaded" !== r && "complete" !== r ? void 0 : (n((i = e.jQuery).noConflict(1), d = !0), i(l).remove()); }, (t.getElementsByTagName("head")[0] || t.documentElement).appendChild(l));
        })(window, document, "1.7", function(e) {
            var t, a, n, o, r;
            return n = "https://coinbase.com", r = function(e) { return "development" === e || "test" === e ? n = document.location.protocol + "//" + document.location.host : void 0; }, o = function(t) {
                var a, o, r;
                return r = t.data.split("|"), o = r[0], a = r[1], a = escape(a), "show modal iframe" === o ? e("#coinbase_modal_iframe_" + a).show() : "mark paid" === o ? (e("#coinbase_button_iframe_" + a).attr("src", n + "/buttons/paid"), e(document).trigger("coinbase_payment_complete", a)) : "mark mispaid" === o ? (e("#coinbase_button_iframe_" + a).attr("src", n + "/buttons/paid"), e(document).trigger("coinbase_payment_mispaid", a)) : "mark expired" === o ? (e("#coinbase_button_iframe_" + a).attr("src", n + "/buttons/paid"), e(document).trigger("coinbase_payment_expired", a)) : "hide modal" === o ? (e("#coinbase_modal_iframe_" + a).hide(), e(document).trigger("coinbase_modal_closed", a)) : "signup redirect" === o ? document.location = n + "/users/verify" : void 0;
            }, a = function(e) {
                switch (e) {
                case "custom_large":
                    return 276;
                case "custom_small":
                    return 210;
                case "subscription_large":
                    return 263;
                case "subscription_small":
                    return 210;
                case "donation_large":
                    return 189;
                case "donation_small":
                    return 148;
                case "buy_now_large":
                    return 211;
                case "buy_now_small":
                    return 170;
                default:
                    return 211;
                }
            }, t = function(e) {
                switch (e) {
                case "custom_large":
                    return 62;
                case "custom_small":
                    return 48;
                default:
                    return 46;
                }
            }, window.addEventListener("message", o, !1), r(e("body").data("env")), e(".coinbase-button").each(function() {
                return function(o, i) {
                    var s, c, d, l, m, u, _, p;
                    return s = e(i), l = s.data(), l.referrer = document.domain, l.embedded = !0, _ = e.param(l), d = s.data("code"), p = s.data("width") || a(s.data("button-style")), m = s.data("height") || t(s.data("button-style")), r(s.data("env")), c = "<iframe src='" + n + "/buttons/" + d + "?" + _ + "' id='coinbase_button_iframe_" + d + "' name='coinbase_button_iframe_" + d + "' style='width: " + p + "px; height: " + m + "px; border: none; overflow: hidden;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>", u = "<iframe src='" + n + "/checkouts/" + d + "/widget?" + _ + "' id='coinbase_modal_iframe_" + d + "' name='coinbase_modal_iframe_" + d + "' style='background-color: transparent; border: 0px none transparent; display: none; position: fixed; visibility: visible; margin: 0px; padding: 0px; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>", "none" !== s.data("button-style") && s.replaceWith(c), e("body").append(u);
                };
            }(this)), e(document).on("coinbase_show_modal", function(t, a) { return console.log("coinbase_show_modal"), e("#coinbase_modal_iframe_" + a).length > 0 ? (e("#coinbase_modal_iframe_" + a).show(), frames["coinbase_modal_iframe_" + a].postMessage("show modal|" + a, "*"), console.log("1")) : console.log("Could not find Coinbase modal with id 'coinbase_modal_iframe_" + a + "'. Does this match the data-code attribute in your embed HTML?"); }), console.log("button.js", n), !1;
        });
    }).call(this);
})).call(this);