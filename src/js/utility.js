define({
    //  Takes a time in seconds and converts it to something human-readable in the format of H:mm:ss or mm:ss.
    prettyPrintTime: function (timeInSeconds) {
        if (isNaN(timeInSeconds)) {
            timeInSeconds = 0;
        }

        var hours = Math.floor(timeInSeconds / 3600);
        var remainingSeconds = timeInSeconds % 3600;

        var minutes = Math.floor(remainingSeconds / 60);
        remainingSeconds = remainingSeconds % 60;

        //  Ensure two-digits for small numbers
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (remainingSeconds < 10) {
            remainingSeconds = '0' + remainingSeconds;
        }

        var timeString = minutes + ':' + remainingSeconds;

        if (hours > 0) {
            timeString = hours + ':' + timeString;
        }

        return timeString;
    },
    
    isBrowserMobile: function() {
        return $.browser.mobile;
    },
    
    isBrowserOpera: function() {
        return $.browser.opr;
    },

    isBrowserChrome: function() {
        return $.browser.chrome;
    },
    
    getBrowserVersion: function() {
        return $.browser.version;
    }
});