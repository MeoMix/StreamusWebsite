(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.async = true;
    js.src = "https://apis.google.com/js/plusone.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'google-jspo'));