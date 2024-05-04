This extension will automatically remove tracking elements from URLs to help protect your privacy when browsing the Internet, 
which is regularly updated by us and can be found 

## Application
Many websites use tracking elements in the URL (e.g. `https://example.com?utm_source=newsletter1&utm_medium=email&utm_campaign=sale`) to mark your online activity. 
All that tracking code is not necessary for a website to be displayed or work correctly and can therefore be removed—that is exactly what ClearURLs does.

Another common example are Amazon URLs. If you search for a product on Amazon you will see a very long URL, such as: 
```
https://www.amazon.com/dp/exampleProduct/ref=sxin_0_pb?__mk_de_DE=ÅMÅŽÕÑ&keywords=tea&pd_rd_i=exampleProduct&pd_rd_r=8d39e4cd-1e4f-43db-b6e7-72e969a84aa5&pd_rd_w=1pcKM&pd_rd_wg=hYrNl&pf_rd_p=50bbfd25-5ef7-41a2-68d6-74d854b30e30&pf_rd_r=0GMWD0YYKA7XFGX55ADP&qid=1517757263&rnid=2914120011
```

Indeed most of the above URL is tracking code. Once ClearURLs has cleaned the address, it will look like this:
`https://www.amazon.com/dp/exampleProduct`

## Features

* Removes tracking from URLs automatically in the background
* Blocks some common ad domains (optional)
* Has a built-in tool to clean up multiple URLs at once
* Supports redirection to the destination, without tracking services as middleman
* Adds an entry to the context menu so that links can be copied quickly and cleanly
* Blocks hyperlink auditing, also known as *ping tracking* (see also [this article](https://html.spec.whatwg.org/multipage/links.html#hyperlink-auditing))
* Prevents ETag tracking
* Prevents tracking injection over history API (see also: [The replaceState() method](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method))
* Prevents Google from rewriting the search results (to include tracking elements)
* Prevents Yandex from rewriting the search results (to include tracking elements)



