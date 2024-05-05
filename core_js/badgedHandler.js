/*jshint esversion: 6 */
/*
* This script is responsible for setting the badged.
*/

let badges = {};

/**
 * Increases the badged by one.
 */
function increaseBadged(quiet = false, request) {
    if (!quiet) increaseCleanedCounter();

    if(request === null) return;

    const tabId = request.tabId;
    const url = request.url;

    if(tabId === -1) return;

    if (badges[tabId] == null) {
        badges[tabId] = {
            counter: 1,
            lastURL: url
        };
    } else {
        badges[tabId].counter += 1;
    }

    checkOSAndroid().then((res) => {
        if (!res) {
            if (storage.badgedStatus && !quiet) {
                browser.browserAction.setBadgeText({text: (badges[tabId]).counter.toString(), tabId: tabId}).catch(handleError);
            } else {
                browser.browserAction.setBadgeText({text: "", tabId: tabId}).catch(handleError);
            }
        }
    });
}

/**
 * Call by each tab is updated.
 * And if url has changed.
 */
function handleUpdated(tabId, changeInfo, tabInfo) {
    if(!badges[tabId] || !changeInfo.url) return;

    if (badges[tabId].lastURL !== changeInfo.url) {
        badges[tabId] = {
            counter: 0,
            lastURL: tabInfo.url
        };
    }
}

/**
 * Call by each tab is updated.
 */
browser.tabs.onUpdated.addListener(handleUpdated);
