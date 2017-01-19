var dropbox_auth = localStorage['drop_auth'];

$(document).ready(function() {
    if (dropbox_auth == null) {
        $('#auth_button').html(chrome.i18n.getMessage('authDB'));
        $('#auth_button').click(function() {
            console.log('login_dropbox')
            chrome.tabs.create({
                url: 'https://www.dropbox.com/1/oauth2/authorize?response_type=token&client_id=73zabmfwm57qxiw&redirect_uri=https://www.dropbox.com/'
            });
            return false;
        });
    } else {
        console.log("auth", dropbox_auth);
        $('#auth_button').html(chrome.i18n.getMessage('authedTip'));
        $('#auth_button').attr('disabled', "true");
    }
});
