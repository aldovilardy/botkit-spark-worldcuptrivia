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
                if (file_info['content-type'] == 'image/png' || file_info['content-type'] == 'image/jpeg') {

                    bot.retrieveFile(message.data.files[0], function(err, file) {
                        
                        //
                        // Write file to filesystem
                        // Overlay command. 
                        // convert Template_FWC18_COL.png IMG_0079.jpg -compose overlay -composite Template_FWC18_COL.png -compose copy-opacity out.png
                        //
                        fs.writeFile('public/' + file_info['filename'], file, 'binary', function (err) {
                            if (err) throw err;
                            console.log('It\'s saved!');
                        });
                        bot.reply(message, {text:'I got a text file with the following content: ' + file_info['date'], files:[process.env.PUBLIC_URL + '/nagato.png']} );
                        bot.reply(message,'I got a text file with the following content: ' + file_info['date'] );
                    });
                }
            });
        }
    });
}
