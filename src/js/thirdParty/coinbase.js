(function () {
    //  I'm just placating requireJS here.
    window.coinbase = true;
    
    var t, n, a, o, r, i;
    return t = !1, n = !1, r = "https://www.coinbase.com", i = function (a) {
        var o, i, s;
        if (s = a.data.split("|"), i = s[0], o = s[1], o = escape(o), a.origin === r) {
            if ("show modal iframe" === i) {
                return $("#coinbase_modal_iframe_" + o).show();
            }
            if ("coinbase_payment_complete" === i) {
                return $("#coinbase_button_iframe_" + o).attr("src", r + "/buttons/paid"), $(document).trigger("coinbase_payment_complete", o);
            }
            if ("coinbase_payment_mispaid" === i) {
                return $(document).trigger("coinbase_payment_mispaid", o);
            }
            if ("coinbase_payment_expired" === i) {
                return $(document).trigger("coinbase_payment_expired", o);
            }
            if ("hide modal" === i) {
                return $("#coinbase_modal_iframe_" + o).hide(), $(document).trigger("coinbase_modal_closed", o);
            }
            if ("signup redirect" === i) {
                return document.location = r + "/users/verify";
            }
            if ("button frame loaded" === i) {
                if (t = !0, n) {
                    return $(document).trigger("coinbase_button_loaded", o);
                }
            } else if ("checkouts frame loaded" === i && (n = !0, t)) {
                return $(document).trigger("coinbase_button_loaded", o);
            }
        }
    }, o = function (e) {
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
    }, a = function (e) {
        switch (e) {
            case "custom_large":
                return 62;
            case "custom_small":
                return 48;
            default:
                return 46;
        }
    }, window.addEventListener("message", i, !1), $(".coinbase-button").each(function () {
        return function (n, i) {
            var c, d, l, u, m, _, p, b;
            return c = $(i), u = c.data(), u.referrer = document.domain, p = $.param(u), l = c.data("code"), b = c.data("width") || o(c.data("button-style")), m = c.data("height") || a(c.data("button-style")), d = "<iframe src='" + r + "/buttons/" + l + "?" + p + "' id='coinbase_button_iframe_" + l + "' name='coinbase_button_iframe_" + l + "' style='width: " + b + "px; height: " + m + "px; border: none; overflow: hidden;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>", _ = "<iframe src='" + r + "/checkouts/" + l + "/widget?" + p + "' id='coinbase_modal_iframe_" + l + "' name='coinbase_modal_iframe_" + l + "' style='background-color: transparent; border: 0px none transparent; display: none; position: fixed; visibility: visible; margin: 0px; padding: 0px; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>", "none" === c.data("button-style") ? t = !0 : c.replaceWith(d), $("body").append(_);
        };
    }(this)), $(document).on("coinbase_show_modal", function (t, n) {
        var iframeExists = $("#coinbase_modal_iframe_" + n).length > 0;
        
        if (iframeExists) {
            $("#coinbase_modal_iframe_" + n).show();
            frames["coinbase_modal_iframe_" + n].postMessage("show modal|" + n, r);
        }
    }), !1;
}).call(this);