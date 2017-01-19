$(document.body).on('click', '.coreSpriteHeartOpen', function() {
    var $span = $(this);
    var imgUrl = $span.parent().parent().parent().prev().find("img").attr("src");
    var authorName = $span.parent().parent().parent().prev().prev().find("div").find("a").text();
    var datetime = $span.parent().parent().parent().prev().prev().find("time").attr("datetime");

    if (imgUrl) {
        chrome.runtime.sendMessage({
            image: imgUrl,
            author: authorName,
            datetime: datetime
        })
    }
})
