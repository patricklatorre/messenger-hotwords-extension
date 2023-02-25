import * as urls from "./services/urls.js"; 


// On install
chrome.runtime.onInstalled.addListener(() => {
    // Show thanks
    chrome.tabs.create({url: urls.thanksPage});
});
