const axios = require('axios');
const fs = require('fs');
const { info, error } = require('./modules/logs');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

console.clear();
info(`UNDESYNC STATUS ROTATOR | Total statuses: ${config.statusText.length}`);

function parseEmoji(emoji) {
    const customEmojiMatch = emoji.match(/^<:(\w+):(\d+)>$/);
    if (customEmojiMatch) {
        return { name: customEmojiMatch[1], id: customEmojiMatch[2], isCustom: true };
    }
    return { name: emoji, id: null, isCustom: false };
}

async function changeStatus(token, statusText, emoji, presence) {
    try {
        const headers = { authorization: token };
        const { name: emoji_name, id: emoji_id, isCustom } = parseEmoji(emoji);

        const customText = isCustom 
            ? statusText 
            : (config.emojiePosition === 0 ? `${emoji_name} ${statusText}` : `${statusText} ${emoji_name}`);

        const customStatus = {
            text: customText,
            emoji_name: isCustom ? emoji_name : null,
            emoji_id: isCustom ? emoji_id : null
        };

        const jsonData = {
            custom_status: customStatus,
            activities: [],
            status: presence
        };

        const response = await axios.patch("https://discord.com/api/v10/users/@me/settings", jsonData, { headers });
        if (response.status === 200) {
            info(`Status changed to: "${customText}", Presence: "${presence}", Emoji: "${emoji}"`);
        } else {
            error(`Failed to update status. Response code: ${response.status}`);
        }
    } catch (err) {
        error("Failed to update status:", err.message);
    }
}

(async () => {
    const { token, presences, emojies, statusText, switchInterval } = config;

    let count = 0;
    while (true) {
        const presence = presences[count % presences.length];
        const emoji = emojies[count % emojies.length];
        const text = statusText[count % statusText.length];

        await changeStatus(token, text, emoji, presence);

        count++;
        await new Promise(resolve => setTimeout(resolve, switchInterval * 1000));
    }
})();
