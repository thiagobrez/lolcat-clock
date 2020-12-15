import enTranslation from "./en.js";
import ptBRTranslation from "./ptBR.js";

var wakeuptime = 7;
var noon = 12;
var lunchtime = 12;
var naptime = lunchtime + 2;
var partytime;
var evening = 18;
var clockInterval;
var oneSecond = 1000;
var translate;
var defaultLanguage = 'ptBR';

// Getting it to show the current time on the page
var showCurrentTime = function () {
    // display the string on the webpage
    var clock = document.getElementById("clock");


    var currentTime = new Date();

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridian = "AM";

    // Set hours
    if (hours >= noon) {
        meridian = "PM";
    }

    if (hours > noon) {
        hours = hours - 12;
    }

    // Set Minutes
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Set Seconds
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // put together the string that displays the time
    var clockTime = hours + ":" + minutes + ":" + seconds + " " + meridian + "!";

    clock.innerText = clockTime;
};

// Getting the clock to increment on its own and change out messages and pictures
var updateClock = function (t) {
    var time = new Date().getHours();
    var messageText;

    var messageParty = translate('messageParty');
    var messageWakeUp = translate('messageWakeUp');
    var messageLunch = translate('messageLunch');
    var messageSleep = translate('messageSleep');
    var messageStdMorning = translate('messageStdMorning');
    var messageStdEvening = translate('messageStdEvening');
    var messageStdAfternoon = translate('messageStdAfternoon');

    var image =
        "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";

    var timeEventJS = document.getElementById("timeEvent");
    var lolcatImageJS = document.getElementById("lolcatImage");

    if (time == partytime) {
        image =
            "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
        messageText = messageParty;
    } else if (time == wakeuptime) {
        image =
            "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
        messageText = messageWakeUp;
    } else if (time == lunchtime) {
        image =
            "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
        messageText = messageLunch;
    } else if (time == naptime) {
        image =
            "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
        messageText = messageSleep;
    } else if (time < noon) {
        image =
            "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg";
        messageText = messageStdMorning;
    } else if (time >= evening) {
        image = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cat_sleep.jpg";
        messageText = messageStdEvening;
    } else {
        image =
            "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
        messageText = messageStdAfternoon;
    }

    timeEventJS.innerText = messageText;
    lolcatImage.src = image;

    showCurrentTime();
};

// Getting the Party Time Button To Work
var partyButton = document.getElementById("partyTimeButton");

var partyEvent = function () {
    if (partytime < 0) {
        partytime = new Date().getHours();
        partyTimeButton.innerText = translate('partyOver')
        partyTimeButton.style.backgroundColor = "#0A8DAB";
    } else {
        partytime = -1;
        partyTimeButton.innerText = translate('partyButtonText');
        partyTimeButton.style.backgroundColor = "#222";
    }
};

partyButton.addEventListener("click", partyEvent);

// Activates Wake-Up selector
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

var wakeUpEvent = function () {
    wakeuptime = wakeUpTimeSelector.value;
};

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);

// Activates Lunch selector
var lunchTimeSelector = document.getElementById("lunchTimeSelector");

var lunchEvent = function () {
    lunchtime = lunchTimeSelector.value;
};

lunchTimeSelector.addEventListener("change", lunchEvent);

// Activates Nap-Time selector
var napTimeSelector = document.getElementById("napTimeSelector");

var napEvent = function () {
    naptime = napTimeSelector.value;
};

napTimeSelector.addEventListener("change", napEvent);

var changeLanguage = function (language) {
    i18next.changeLanguage(language, function (err, t) {
        translate = t;

        updateTexts();
        updateDate(language);
        partyEvent();

        clearInterval(clockInterval);
        clockInterval = setInterval(updateClock, oneSecond);
    });
};

var enButton = document.getElementById("en");
var ptBRButton = document.getElementById("ptBR");

enButton.addEventListener("click", function () {
    changeLanguage("en");
});
ptBRButton.addEventListener("click", function () {
    changeLanguage("ptBR");
});

function updateTexts() {
    document.getElementById("title").innerText = translate("title");
    document.getElementById("title2").innerText = translate("title2");
    document.getElementById("wakeUpTimeText").innerText = translate("wakeUpTimeMessage");
    document.getElementById("lunchTimeText").innerText = translate("lunchTimeMessage");
    document.getElementById("napTimeText").innerText = translate("napTimeMessage");
    document.getElementById("partyTimeButton").innerText = translate("partyButtonText");
}

function updateDate(language) {
    const locale = language === 'ptBR' ? 'pt-BR' : 'en-US';
    const timeZone = language === 'ptBR' ? 'America/Sao_Paulo' : 'UTC';
    const formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timeZone
    }).format(new Date());

    document.getElementById('date').innerText = formattedDate
}

i18next.init(
    {
        lng: defaultLanguage,
        debug: true,
        resources: {
            en: {
                translation: enTranslation,
            },
            ptBR: {
                translation: ptBRTranslation,
            },
        },
    },
    function (err, t) {
        translate = t;

        updateTexts();
        updateDate(defaultLanguage);
        partyEvent();

        clockInterval = setInterval(updateClock, oneSecond);
    }
);
