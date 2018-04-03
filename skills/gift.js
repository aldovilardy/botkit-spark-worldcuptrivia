//
// Command: gift
//
var emoji = require('node-emoji');
module.exports = function (controller) {

    controller.hears([/^gift$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Nice day! Here your free sticker today.";
        text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself 🤖";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills 🤖";
        
        bot.reply(message, text);
    });
}
