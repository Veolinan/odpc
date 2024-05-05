/*
* ClearURLs
/*jshint esversion: 6 */

/**
 * Cleans given URLs. Also do automatic redirection.
 *
 * @param  {String} url     url as string
 * @param {boolean} quiet   if the action should be displayed in log and statistics
 * @return {String}         cleaned URL
 */
function pureCleaning(url, quiet = false) {
    let before = url;
    let after = url;

    do {
        before = after;
        after = _cleaning(before, quiet);
    } while (after !== before); // do recursive cleaning

    return after;
}

/**
 * Internal function to clean the given URL.
 */
function _cleaning(url, quiet = false) {
    let cleanURL = url;
    const URLbeforeReplaceCount = countFields(url);

    if (!quiet) {
        //Add Fields form Request to global url counter
        increaseTotalCounter(URLbeforeReplaceCount);
    }

    for (let i = 0; i < providers.length; i++) {
        let result = {
            "changes": false,
            "url": "",
            "redirect": false,
            "cancel": false
        };

        if (providers[i].matchURL(cleanURL)) {
            result = removeFieldsFormURL(providers[i], cleanURL, quiet);
            cleanURL = result.url;
        }

        if (result.redirect) {
            return result.url;
        }
    }

    return cleanURL;
}
