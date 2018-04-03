//
// Command: help
//
var emoji = require('node-emoji');
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "😊 I understand:";
        text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself 🤖";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills 🤖";
        text += "\n- " + bot.appendMention(message, "gift") + ": receive a free player sticker 🎁";
        
        bot.reply(message, text);
    });
}
