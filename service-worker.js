import * as urls from "./services/urls.js"; 


chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({url: urls.thanksPage});
});
