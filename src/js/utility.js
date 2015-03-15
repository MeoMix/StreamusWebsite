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

    //  Similar to prettyPrintTime, but incorporates "days" "hours" "minutes" into the end result instead of just using numbers.
    prettyPrintTimeWithWords: function (timeInSeconds) {
        var prettyTime;
        var timeInMinutes = Math.floor(timeInSeconds / 60);

        //  Print the total duration of content in minutes unless there is 3+ hours, then just print hours.
        if (timeInMinutes === 1) {
            prettyTime = timeInMinutes + ' ' + chrome.i18n.getMessage('minute');
        }
            //  3 days
        else if (timeInMinutes > 4320) {
            prettyTime = Math.floor(timeInMinutes / 1440) + ' ' + chrome.i18n.getMessage('days');
        }
            //  3 hours
        else if (timeInMinutes > 180) {
            prettyTime = Math.floor(timeInMinutes / 60) + ' ' + chrome.i18n.getMessage('hours');
        } else {
            prettyTime = timeInMinutes + ' ' + chrome.i18n.getMessage('minutes');
        }

        return prettyTime;
    }
});