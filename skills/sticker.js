//
// Command: avatar
//
var emoji = require('node-emoji');
var request = require('request'),
fs = require('fs');

module.exports = function (controller) {

    controller.hears([/^sticker .*$/i], 'direct_message,direct_mention', function (bot, message) {
        //
        // First take a photo
        //
        var takephoto_text = "###Ok. Please take a picture. 📸";
                
        //
        // Check if the original message has a photo.
        //
        if (message.data.files) {

            //
            // Check for the name in the message
            //
            var sticker_name = "";
            var reName = new RegExp(/^sticker (.*)$/i);
            var arrMatches = message.text.match(reName);

            if (arrMatches[1]){
                sticker_name = arrMatches[1]; 
            } 
            
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

                        //
                        // Create the sticker
                        //
                        var sticker_command = 'sh ./commands/create_sticker.sh -in="public/' + 'IMG_0078.jpg' + '" -out="public/' + "IMG_0078.png" + '" -name="' + "Niña Alianza" + '" -org="Calltech S.A." -dob="17-03-2017" -y="2018"';
                        shell.exec(sticker_command);

                        bot.reply(message, {text:'Here is your Sticker, share with your friends on the social media:', files:[process.env.PUBLIC_URL + '/nagato.png']} );
                        //bot.reply(message,'I got a text file with the following content: ' + file_info['date'] );
                    });
                }
            });
        }
    });
}
