var dropbox_auth = localStorage['dropbox_auth'];
var dropbox_client = '73zabmfwm57qxiw';
var dropbox_auth_url = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${dropbox_client}&redirect_uri=https://www.dropbox.com/`

$(document).ready(function() {
    if (dropbox_auth == null) {
        $('#auth_button').html(chrome.i18n.getMessage('authDB'));
        $('#auth_button').click(function() {
            console.log('login_dropbox')
            chrome.tabs.create({
                url: dropbox_auth_url
            });
            return false;
        });
    } else {
        console.log("authed:", dropbox_auth);
        $('#auth_button').html(chrome.i18n.getMessage('authedTip'))
        $('#auth_button').hover(function() {
            $(this).html(chrome.i18n.getMessage('deauthDB'))
        }, function() {
            $(this).html(chrome.i18n.getMessage('authedTip'))
        });
        $('#auth_button').click(function() {
            localStorage.removeItem('dropbox_auth')
            window.close()
            return false
        });
    }
});
