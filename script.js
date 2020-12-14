import enTranslation from "./en.js";
import ptBRTranslation from "./ptBR.js";

var wakeuptime = 7;
var noon = 12;
var lunchtime = 12;
var naptime = lunchtime + 2;
var partytime;
var evening = 18;

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
var updateClock = function () {
  var time = new Date().getHours();
  var messageText;

  var messageParty = "Let's party!";
  var messageWakeUp = "Wake up!";
  var messageLunch = "Let's have some lunch!";
  var messageSleep = "Sleep tight!";
  var messageStdMorning = "Good morning!";
  var messageStdEvening = "Good evening!";
  var messageStdAfternoon = "Good afternoon!";

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

  console.log(messageText);
  timeEventJS.innerText = messageText;
  lolcatImage.src = image;

  showCurrentTime();
};
updateClock();

// Getting the clock to increment once a second
var oneSecond = 1000;
setInterval(updateClock, oneSecond);

// Getting the Party Time Button To Work
var partyButton = document.getElementById("partyTimeButton");

var partyEvent = function () {
  if (partytime < 0) {
    partytime = new Date().getHours();
    partyTimeButton.innerText = "Party Over!";
    partyTimeButton.style.backgroundColor = "#0A8DAB";
  } else {
    partytime = -1;
    partyTimeButton.innerText = "Party Time!";
    partyTimeButton.style.backgroundColor = "#222";
  }
};

partyButton.addEventListener("click", partyEvent);
partyEvent();

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
    updateTexts(t);
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

function updateTexts(t) {
  document.getElementById("title").innerText = t("title");
  document.getElementById("title2").innerText = t("title2");
  enButton.innerText = t("english");
  ptBRButton.innerText = t("portuguese");
  messageParty = t("messageParty");
  messageWakeUp = t("messageWakeUp");
  messageLunch = t("messageLunch");
  messageSleep = t("messageSleep");
  messageStdMorning = t("messageStdMorning");
  messageStdEvening = t("messageStdEvening");
  messageStdAfternoon = t("messageStdAfternoon");
  document.getElementById("wakeUpTimeText").innerText = t("wakeUpTimeMessage");
  document.getElementById("lunchTimeText").innerText = t("lunchTimeMessage");
  document.getElementById("napTimeText").innerText = t("napTimeMessage");
  document.getElementById("partyTimeButton").innerText = t("partyButtonText");
  updateClock();
}

i18next.init(
  {
    lng: "ptBR",
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
    updateTexts(t);
  }
);
