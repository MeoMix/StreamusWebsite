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

        var minutesInDay = 1440;
        var threeDaysInMinutes = 4320;
        var minutesInHour = 60;
        var threeHoursInMinutes = 180;

        //  Print the total duration of content in minutes unless there is 3+ hours, then just print hours.
        if (timeInMinutes === 1) {
            prettyTime = timeInMinutes + ' ' + 'minute';
        }
        else if (timeInMinutes > threeDaysInMinutes) {
            prettyTime = Math.floor(timeInMinutes / minutesInDay) + ' ' + 'days';
        }
        else if (timeInMinutes > threeHoursInMinutes) {
            prettyTime = Math.floor(timeInMinutes / minutesInHour) + ' ' + 'hours';
        } else {
            prettyTime = timeInMinutes + ' ' + 'minutes';
        }

        return prettyTime;
    }
});