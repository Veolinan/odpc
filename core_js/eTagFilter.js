

/*jshint esversion: 6 */

/**
 * Filters eTag headers from web requests.
 */
function eTagFilter(requestDetails) {
    if(!requestDetails.responseHeaders || !storage.eTagFiltering
        || storage.localHostsSkipping && checkLocalURL(new URL(requestDetails.url))) return {};
    for(let i=0; i < requestDetails.responseHeaders.length; i++) {
        const header = requestDetails.responseHeaders[i];

        if(header.name.toString().toLowerCase() !== "etag") {
            continue;
        }

        const etag = header.value.toLowerCase();
        const w = etag.startsWith('w');
        const quotes = etag.endsWith('"');

        let len = etag.length;
        if (w) len -= 2;
        if (quotes) len -= 2;

        // insert dummy etag
        requestDetails.responseHeaders[i].value = generateDummyEtag(len, quotes, w);

        pushToLog(requestDetails.url, requestDetails.url, translate("eTag_filtering_log"));

        break;
    }

    return {responseHeaders: requestDetails.responseHeaders};
}

/**
 * Generates a random ETag.
 * 
 * Must be ASCII characters placed between double quotes.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
 */
function generateDummyEtag(len, quotes = true, w = false) {
    let rtn = randomASCII(len);

    if (quotes) rtn = '"' + rtn + '"';
    if (w) rtn = 'W/' + rtn;

    return rtn;
}

/**
 * Since Firefox 85, eTags can no longer be 
 * used for tracking users over multiple sites.
 */
if(getBrowser() !== "Firefox") {
    browser.webRequest.onHeadersReceived.addListener(
        eTagFilter,
        {urls: ["<all_urls>"]},
        ["blocking", "responseHeaders"]
    );
}