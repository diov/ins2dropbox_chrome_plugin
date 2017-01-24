$(document.body).on('click', '.coreSpriteHeartOpen', function() {
    var $span = $(this);
    var imgUrl = $span.parent().parent().parent().prev().find("img").attr("src");
    var authorName = $span.parent().parent().parent().prev().prev().find("div").find("a").text();

    if (imgUrl) {
        console.log("imageUrl", imgUrl);
        chrome.runtime.sendMessage({
            image: imgUrl,
            author: authorName
        })
    }
})
