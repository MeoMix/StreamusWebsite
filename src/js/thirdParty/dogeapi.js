(function() {
    //  TODO: I'm just placating requireJS here. There's gotta be a better solution at some point.
    window.Dogeapi = true;
    function r() {
        e = window.jQuery.noConflict(true);
        i();
    }

    function i() {
        e(document).ready(function(e) {
            e("head").append('<link rel="stylesheet" href="' + t + '/widget/widget.css" type="text/css" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
            e(".doge-widget-wrapper").each(function() {
                var n = e(this);
                var r = e(this).find("input[name=widget_key]").val();
                if (r === undefined) r = "";
                var i = e(this).find("input[name=payment_address]").val();
                if (i === undefined) i = "error getting payment address";
                var s = e(this).find("input[name=widget_type]").val();
                if (s === undefined) s = "pay";
                var o = e(this).find("input[name=address_label]").val();
                if (o === undefined) o = "";
                var u = e(this).find("input[name=new_address]").val();
                if (u === undefined) {
                    u = false;
                } else {
                    i = "error getting payment address";
                }
                var a = e(this).find("input[name=payment_label]").val();
                if (a === undefined) {
                } else {
                }
                var f = e(this).find("input[name=amount_doge]").val();
                if (f === undefined) {
                    f = "";
                }
                var l = e(this).find("input[name=amount_usd]").val();
                if (l !== undefined) {
                    e.ajax({
                        url: t + "/wow/js.php",
                        data: "widget_key=" + r + "&a=get_current_price",
                        success: function(e) {
                            if (e != "Bad Query") {
                                f = l / e;
                                var t = Math.round(f * 1e8) / 1e8;
                                n.find(".doge-widget-payment-address .branding.primary").html(t + " DOGE");
                                n.find("input[name=amount_usd]").attr("value", t);
                                n.find("input[name=amount_usd]").attr("name", "amount_doge");
                            }
                        },
                        dataType: "json",
                        type: "GET"
                    });
                }
                var c = e(this).find("input[name=show_received]").val();
                var h = e(this).find("input[name=animation_type]").val();
                if (h === undefined) {
                    h = "expand_right";
                }
                if (c == "1") {
                    c = true;
                    if (o != "") params = "&payment_address=" + o;
                    if (i != "") params = "&payment_address=" + i;
                    e.ajax({
                        url: t + "/wow/js.php",
                        data: "widget_key=" + r + "&a=get_address_received" + params,
                        success: function(e) {
                            if (e != "Bad Query") {
                                var t = n.find(".doge-widget-received");
                                t.html("<b>" + e + "</b>D");
                                t.show();
                                n.find(".doge-widget-pay-link").css("top", "-6px");
                                n.find(".doge-widget-received-label").show();
                            }
                        },
                        dataType: "json",
                        type: "GET"
                    });
                } else {
                    c = false;
                }
                if (s == "pay" || s == "donate") {
                    var p = "pay";
                    var d = "Pay With";
                    if (s == "donate") p = "donate";
                    if (s == "donate") d = "Donate";
                    var v = "<button class='doge-widget-pay' id='widget-inactive'><div class='doge-widget-text doge-widget-site-link'><img class='doge-widget-logo' src='https://dogeapi.com/widget/dogeapi-" + p + ".png'></div><img width='32' class='doge-widget-icon' src='https://dogeapi.com/widget/coin.png'><div class='doge-widget-texts'><div class='doge-widget-text doge-widget-pay-link'>" + d + " Doge</div><div class='doge-widget-text doge-widget-received primary'></div><div class='doge-widget-text doge-widget-received-label'>has been donated</div></div></button><div class='doge-widget-payment-address'>Or " + p + " <span class='branding primary'>" + f + "DOGE</span> to <b class='payment-address-color'>" + i + "</b> with your wallet.</b></div><div class='doge-widget-cancel-link'><a href='#'>Cancel</a></div>";
                    e(this).find(".doge-widget").html(v);
                    n.find(".doge-widget-pay").click(function(s) {
                        if (i == "error getting payment address") {
                            e.ajax({ url: t + "/wow/js.php", data: "widget_key=" + r + "&a=get_new_address&label=" + u, success: function(e) { n.find(".payment-address-color").html(e); }, dataType: "json", type: "GET" });
                        }
                        var o = e(this).attr("id");
                        if (o == "widget-inactive") {
                            if (h !== "checkout") s.preventDefault();
                            var a = n.find(".doge-widget-payment-address");
                            n.find(".doge-widget-texts .doge-widget-text").animate({ width: "0%" }, 150, function() {
                                n.find(".doge-widget-icon").animate({ left: "95px" }, 150, function() {
                                    n.find(".doge-widget-site-link").animate({ width: "91px" }, 50, function() {
                                    });
                                    a.animate({ width: "450px", opacity: "1", "font-size": "12px" }, 120, function() {
                                        n.find(".doge-widget-pay").attr("id", "widget-active");
                                        n.find(".doge-widget-cancel-link").animate({ left: "580px", opacity: "1" }, 400, function() {
                                            n.find(".doge-widget-cancel-link a").click(function(t) {
                                                t.preventDefault();
                                                n.find(".doge-widget-cancel-link").animate({ left: "0px", opacity: "0" }, 100, function() {
                                                    e(".doge-widget-pay").attr("id", "widget-inactive");
                                                    a.animate({ width: "0px", opacity: "0", "font-size": "12px" }, 120, function() {
                                                        n.find(".doge-widget-site-link").animate({ width: "0" }, 50, function() {
                                                            n.find(".doge-widget-icon").animate({ left: "3px" }, 150, function() {
                                                                n.find(".doge-widget-texts .doge-widget-text").animate({ width: "91px" }, 150, function() {
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
                e(this).find(".doge-widget").show();
            });
        });
    }

    var e = window.jQuery;
    var t = "https://www.dogeapi.com";
    i();
})()