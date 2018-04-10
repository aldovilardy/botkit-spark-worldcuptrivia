//
// Command: avatar
//
var emoji = require('node-emoji');
var request = require('request'),
fs = require('fs');

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
                if (file_info['content-type'] == 'image/png') {

                    bot.retrieveFile(message.data.files[0], function(err, file) {
                        
                        //
                        // Write file to filesystem
                        //
                        fs.writeFile('public/' + file_info['filename'], file, 'binary', function (err) {
                            if (err) throw err;
                            console.log('It\'s saved!');
                        });
                        bot.reply(message, {text:'I got a text file with the following content: ' + file_info['date'], files:['https://12dc8ed9.ngrok.io/public/nagato.png']} );
                        bot.reply(message,'I got a text file with the following content: ' + file_info['date'] );
                    });
                }
            });
        }
    });
}
