'use strict';

var pusher = new Pusher('4c20f4052ecd7ffc6b0d', {
    disableStats: true
});

chrome.browserAction.setBadgeText({text: "1"});
