# asana-markdown
## chrome extension to add markdown formatting in asana

Performs rich text formatting after rendering. Is a rough approximation of
reactive, and currently supports **bold**, _italic_, and `code` formatting.

Known issues:
 * `_"italic quotes"_` are not supported to avoid a problem with underscores being somewhat common
 * occasional race conditions with react
 * clicking on links in the description seems to be broken
 * updating the description also seems broken
