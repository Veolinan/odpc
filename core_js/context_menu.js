
/*jshint esversion: 6 */
/*
* This script is responsible for context menu cleaning functions
* and based on: https://github.com/mdn/webextensions-examples/tree/master/context-menu-copy-link-with-types
*/

function contextMenuStart() {
    if(storage.contextMenuEnabled) {
        browser.contextMenus.create({
            id: "copy-link-to-clipboard",
            title: translate("clipboard_copy_link"),
            contexts: ["link"]
        });

        browser.contextMenus.onClicked.addListener((info, tab) => {
            if (info.menuItemId === "copy-link-to-clipboard") {
                const url = pureCleaning(info.linkUrl);
                const code = "copyToClipboard(" +
                JSON.stringify(url)+");";

                browser.tabs.executeScript({
                    code: "typeof copyToClipboard === 'function';",
                }).then((results) => {
                    if (!results || results[0] !== true) {
                        return browser.tabs.executeScript(tab.id, {
                            file: "/external_js/clipboard-helper.js",
                        }).catch(handleError);
                    }
                }).then(() => {
                    return browser.tabs.executeScript(tab.id, {
                        code,
                    });
                }).catch((error) => {
                    console.error("Failed to copy text: " + error);
                });
            }
        });
    }
}
