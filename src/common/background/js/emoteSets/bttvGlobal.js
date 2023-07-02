const URL = 'https://emotes.adamcy.pl/v1/global/emotes/bttv';


function parseEmotes(json) {
    var result = {};

    for (var i = 0; i < json.length; ++i) {
        result[json[i].code] = {
            url: json[i].urls[0].url,
            channel: 'BTTV Global Emote'
        };
    }

    return result;
}

module.exports = {
    parseEmotes: parseEmotes,
    getURL: function() {
        return URL;
    }
};