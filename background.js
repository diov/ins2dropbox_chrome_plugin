var regex = /access_token=(.+?)(?:&|$)/;
var imageRegex = /\/([^/]+?)(?:\?|$|#)/;
var scaleRegex = /s\d+x\d+\//;
var cacheRegex = /\?ig_cache_key.+/;
var dropboxUrl = "https://api.dropboxapi.com/2/files/save_url";

chrome.webRequest.onBeforeRedirect.addListener(
    function(details) {
        var redirectUrl = details.redirectUrl;
        var matched = redirectUrl.match(regex);
        localStorage['dropbox_auth'] = matched[1];
        // console.log(`auth: ${matched[1]}`);
    }, {
        urls: ["*://*.dropbox.com/oauth2/*"]
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.image && localStorage['dropbox_auth']) {
            // 取 imageUrl
            var imageUrl = request.image;
            if (imageUrl.match(scaleRegex) != null) {
                imageUrl = imageUrl.replace(imageUrl.match(scaleRegex)[0], '')
            }
            if (imageUrl.match(cacheRegex) != null) {
                imageUrl = imageUrl.replace(imageUrl.match(cacheRegex)[0], '')
            }

            var matched = imageUrl.match(imageRegex);
            var imagePath = `${request.author}_${matched[1]}`
            var data = `{\"path\": \"/instagram/${imagePath}\",\"url\": \"${imageUrl}\"}`;
            console.log(data);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", dropboxUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage['dropbox_auth']);
            xhr.send(data);
        }
    }
);
