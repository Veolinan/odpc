

/*jshint esversion: 6 */
/*
* This script is responsible for the blocked alert page.
*/

/**
 * Set the text for the UI.
 */
function setText()
{
    document.title = translate('blocked_html_title');
    document.getElementById('title').innerHTML = translate('blocked_html_title');
    document.getElementById('body').innerHTML = translate('blocked_html_body');
    document.getElementById('page').textContent = translate('blocked_html_button');

}

(function() {
    setText();

    const source = new URLSearchParams(window.location.search).get("source");
    document.getElementById('page').href = decodeURIComponent(source);
})();

/**
 * Translate a string with the i18n API.
 *
 * @param {string} string Name of the attribute used for localization
 */
function translate(string)
{
    return browser.i18n.getMessage(string);
}