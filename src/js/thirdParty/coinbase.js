((function() {
    var a;
    a = function(a, b, c, d) {
        var e, f, g, h, i;
        i = [null, null, !1], f = i[0], e = i[1], g = i[2];
        if (!(f = a.jQuery) || c > f.fn.jquery || d(f, g)) return h = b.createElement("script"), h.type = "text/javascript", h.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", h.onload = h.onreadystatechange = function() { if (!g && (!(e = this.readyState) || e === "loaded" || e === "complete")) return d((f = a.jQuery).noConflict(1), g = !0), f(h).remove(); }, (b.getElementsByTagName("head")[0] || b.documentElement).appendChild(h);
    }, a(window, document, "1.7", function(a, b) {
        var c, d, e, f, g = this;
        return d = "https://coinbase.com", f = function(a) {
            if (a === "development") return d = "http://localhost:3000";
            if (a === "test") return d = "http://" + window.document.location.host;
        }, e = function(b) {
            var c, e, f;
            f = b.data.split("|"), e = f[0], c = f[1], c = escape(c);
            if (b.origin !== d) return;
            if (e === "show modal iframe") return a("#coinbase_modal_iframe_" + c).show();
            if (e === "mark paid") return a("#coinbase_button_iframe_" + c).attr("src", d + "/buttons/paid"), a(document).trigger("coinbase_payment_complete", c);
            if (e === "hide modal") return a("#coinbase_modal_iframe_" + c).hide(), a(document).trigger("coinbase_modal_closed", c);
            if (e === "signup redirect") return document.location = d + "/users/verify";
        }, c = function(a) {
            switch (a) {
            case "custom_large":
                return 249;
            case "custom_small":
                return 190;
            case "subscription_large":
                return 243;
            case "subscription_small":
                return 190;
            case "donation_large":
                return 189;
            case "donation_small":
                return 148;
            case "buy_now_small":
                return 150;
            default:
                return 191;
            }
        }, window.addEventListener("message", e, !1), f(a("body").data("env")), a(".coinbase-button").each(function(b, e) {
            var g, h, i, j, k, l;
            return g = a(e), i = g.data(), i.referrer = document.domain, k = a.param(i), h = g.data("code"), l = g.data("width") || c(g.data("button-style")), j = g.data("height") || 46, f(g.data("env")), g.data("button-style") !== "none" && g.replaceWith("<iframe src='" + d + "/buttons/" + h + "?" + k + "' id='coinbase_button_iframe_" + h + "' name='coinbase_button_iframe_" + h + "' style='width: " + l + "px; height: " + j + "px; border: none; overflow: hidden;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>"), a("body").append("<iframe src='" + d + "/buttons/" + h + "/widget?" + k + "' id='coinbase_modal_iframe_" + h + "' name='coinbase_modal_iframe_" + h + "' style='background-color: transparent; border: 0px none transparent; overflow: hidden; display: none; position: fixed; visibility: visible; margin: 0px; padding: 0px; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>");
        }), a(document).on("coinbase_show_modal", function(b, c) { return a("#coinbase_modal_iframe_" + c).length > 0 ? (a("#coinbase_modal_iframe_" + c).show(), frames["coinbase_modal_iframe_" + c].postMessage("show modal|" + c, d)) : console.log("Could not find Coinbase modal with id 'coinbase_modal_iframe_" + c + "'.  Does this match the data-code attribute in your embed HTML?"); });
    });
})).call(this);