//
// Command: gift
//
var emoji = require('node-emoji');
module.exports = function (controller) {

    controller.hears([/^gift$/], 'direct_message,direct_mention', function (bot, message) {
        var sticker_text = "###🎁 Nice day! Here your free sticker today. 🎁\n";
        var sticker = "https://www.laschivasrayadas.com.mx/media/galeria/325/0/9/8/7/n_chivas_guadalajara_futbol_mundial-8157890.png";
        
        bot.reply(message, {text:sticker_text, files:[sticker]});
    });
}
