const URL = 'https://api.twitch.tv/helix/chat/emotes/global/';
const BASE_EMOTE_URL = 'https://static-cdn.jtvnw.net/emoticons/v2/{EMOTE_ID}/default/light/1.0';
const storageHelper = require('../../../storageHelper');
var browser = require('browser');
const httpRequest = require('../httpRequest');


function parseEmotes(json) {
    return new Promise(function(resolve, reject) {
    var result = {};
    var emoteList = json.data;
    httpRequest.get(browser.getURL('assets/emotes/twitchSmilies.json')).then(responseJSON => {
        storageHelper.getAllSettings().then(loadedSettings => {
            var smiliesType = loadedSettings.smiliesType;
            for (var i = 0; i < emoteList.length; i++) {
            var name = emoteList[i].name;
            var id = emoteList[i].id;
            if (responseJSON[smiliesType][name] === undefined) {
                result[name] = {
                    url: BASE_EMOTE_URL.replace('{EMOTE_ID}', id),
                    channel: 'Global Twitch Emote'
                };
            }
        }
        resolve(result);
        }).catch(function (error) {
            console.error(error);
            reject(result);
        });
    }).catch(function (error) {
        console.error(error);
        reject(result);
        });
    });
}


module.exports = {
    parseEmotes: parseEmotes,
    getURL: function() {
        return URL;
    }
};