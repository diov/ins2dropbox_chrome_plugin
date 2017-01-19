var regex = /access_token=(.+?)(?:&|$)/;
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
            // chrome.downloads.download({
            //     url: request.image,
            //     saveAs: false
            // })
            var imageUrl = request.image;
            var imagePath = `${request.author}_${request.datetime}.jpg`
            var data = `{\"path\": \"/${imagePath}\",\"url\": \"${imageUrl}\"}`;
            console.log(`imagePath: ${imagePath}, dataUrl: ${data}`);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", dropboxUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage['dropbox_auth']);
            xhr.send(data);
        }
    }
);
