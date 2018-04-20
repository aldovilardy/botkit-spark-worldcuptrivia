//
// Command: gift
//
var emoji = require('node-emoji');
module.exports = function (controller) {

    controller.hears([/^gift$/i], 'direct_message,direct_mention', function (bot, message) {
        var sticker_text = "###🎁 Nice day! Here your free sticker today. 🎁\n";
        var sticker = "https://i.imgur.com/e3t6CcF.jpg";
        
        bot.reply(message, {text:sticker_text, files:[sticker]});
    });
}
