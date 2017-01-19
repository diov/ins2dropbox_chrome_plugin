var dropbox_auth = localStorage['drop_auth'];
var regex = /access_token=(.+?)(?:&|$)/;

chrome.webRequest.onBeforeRedirect.addListener(
    function(details) {
        var redirectUrl = details.redirectUrl;
        var matched = redirectUrl.match(regex);
        localStorage['drop_auth'] = matched[1];
        console.log("dropbox_auth", matched[1]);
    }, {
        urls: ["*://*.dropbox.com/1/oauth2/*"]
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.image) {
            // chrome.downloads.download({
            //     url: request.image,
            //     saveAs: false
            // })
            var url = "https://api.dropboxapi.com/2/files/save_url";
            var imageUrl = request.image;
            var imagePath = request.author + " " + request.datetime + ".jpg";
            console.log("imagePath", imagePath);
            var data = "{\"path\": \"/" + imagePath + "\",\"url\": \"" + request.image + "\"}";
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: data,

                contentType: "application/json",
                headers: {
                    'Authorization': 'Bearer ' + localStorage['drop_auth']
                },
                success: function(response) {
                    console.log("response : " + JSON.stringify(response));
                }
            });
        }
    }
);
