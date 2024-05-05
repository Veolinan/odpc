/*jshint esversion: 6 */
/*
* This script is responsible to check in fixed intervals, that ClearURLs works properly.
* In issue #203, some users reported, that ClearURLs filter function doesn't work after
* some time, but without any recognizable reason.
*
* This watchdog restarts the whole Add-on, when the check fails.
*/
const CHECK_INTERVAL = 60000;
const __dirtyURL = "https://clearurls.roebert.eu?utm_source=addon";
const __cleanURL = new URL("https://clearurls.roebert.eu").toString();

setInterval(function() {
    if(isStorageAvailable() && storage.globalStatus) {
        if(new URL(pureCleaning(__dirtyURL, true)).toString() !== __cleanURL) {
            storage.watchDogErrorCount += 1;
            console.log(translate('watchdog', storage.watchDogErrorCount));
            saveOnExit();
            if(storage.watchDogErrorCount < 3) reload();
        } else if(storage.watchDogErrorCount > 0){
            storage.watchDogErrorCount = 0;
            saveOnExit();
        }
    }
}, CHECK_INTERVAL);
