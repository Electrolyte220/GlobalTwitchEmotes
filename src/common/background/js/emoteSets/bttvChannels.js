const URL = 'https://api.betterttv.net/3/cached/users/twitch';
const BASE_EMOTE_URL = 'https://cdn.betterttv.net/emote/{EMOTE_ID}/1x'


function parseEmotes(json, channelName) {
    var result = {};
    var emotes = json.channelEmotes.concat(json.sharedEmotes);

    for (var i = 0; i < emotes.length; ++i) {
        var emote = emotes[i];

        result[emote.code] = {
            url: BASE_EMOTE_URL.replace('{EMOTE_ID}', emote.id),
            channel: `${channelName} BTTV Emote`
        };
    }

    return result;
}


module.exports = {
    parseEmotes: parseEmotes,
    getURL: function(channelId) {
        return URL + '/' + channelId;
    }
};