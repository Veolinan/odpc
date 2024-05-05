/*
* ClearURLs
* Based on:
*   Remove Google Redirection
*   https://github.com/kodango/Remove-Google-Redirection/blob/master/extension/chrome/remove-google-redirection.user.js
*   Copyright (c) 2017 kodango
*   MIT License: https://github.com/kodango/Remove-Google-Redirection/blob/master/LICENSE
*/
(function (window) {
    "use strict";

    function injectFunction() {
        let ele = document.createElement('script');
        let s = document.getElementsByTagName('script')[0];

        ele.type = 'text/javascript';
        ele.textContent = "Object.defineProperty(window, 'rwt', {" +
        "    value: function() { return true; }," +
        "    writable: false," +
        "    configurable: false" +
        "});";

        s.parentNode.insertBefore(ele, s);
    }

    /*
    * The main entry
    */
    function main()
    {
        injectFunction();

        document.addEventListener('mouseover', function (event) {
            let a = event.target, depth = 1;

            while (a && a.tagName !== 'A' && depth-- > 0) {
                a = a.parentNode;
            }

            if (a && a.tagName === 'A') {
                try {
                    a.removeAttribute('data-cthref');
                    delete a.dataset.cthref;
                } catch(e) {
                    console.log(e);
                }
            }
        }, true);
    }

    main();
})(window);
