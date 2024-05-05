/*
* ClearURLs
/*jshint esversion: 6 */
/*
* This script is responsible for listen on history changes.
* This technique is often used to inject tracking code into the location bar,
* because all feature events will use the updated URL.
*/

function historyListenerStart() {
    if(storage.historyListenerEnabled) {
        browser.webNavigation.onHistoryStateUpdated.addListener(historyCleaner);
    }
}

/**
* Function that is triggered on history changes. Injects script into page
* to clean links that were pushed to the history stack with the
* history.replaceState method.
* @param  {state object} details The state object is a JavaScript object
* which is associated with the new history entry created by replaceState()
*/
function historyCleaner(details) {
    if(storage.globalStatus) {
        const urlBefore = details.url;
        const urlAfter = pureCleaning(details.url);

        if(urlBefore !== urlAfter) {
            browser.tabs.executeScript(details.tabId, {
                frameId: details.frameId,
                   code: 'history.replaceState({state: null},"",'+JSON.stringify(urlAfter)+');'
            }).then(() => {}, onError);
        }
    }
}

function onError(error) {
    console.log(`[ClearURLs] Error: ${error}`);
}
