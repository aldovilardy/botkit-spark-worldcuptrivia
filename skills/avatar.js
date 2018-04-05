//
// Command: avatar
//
var emoji = require('node-emoji');
module.exports = function (controller) {

    controller.hears([/^avatar$/i], 'direct_message,direct_mention', function (bot, message) {
        //
        // First take a photo
        //
        var takephoto_text = "###Ok. Please take a picture. 📸";
                
        //
        // Check if the original message has a photo.
        //
        if (message.data.files) {
            bot.retrieveFileInfo(message.data.files[0], function(err, file_info) {
                if (file_info['content-type'] == 'text/plain') {
                    bot.retrieveFile(message.data.files[0], function(err, file) {
                        bot.reply(message,'I got a text file with the following content: ' + file);
                    });
                }
            });
        }
    });
}
