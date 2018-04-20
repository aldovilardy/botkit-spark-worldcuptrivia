//
// Command: avatar
//
var emoji = require('node-emoji');
var request = require('request');
var date_format = require('dateformat');
fs = require('fs');
const exec = require('child_process').exec; 

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
                            console.log('Filename ' + file_info['filename'] + ' saved!');

                            //
                            // Create the sticker
                            // Windows style
                            //
                            var sticker_photo_input = 'public/' + file_info['filename'];
                            var sticker_photo_output = 'public/' + file_info['filename'].slice(0, -4) + "_sticker.png";
                            var sticker_command_first = 'cconvert commands/mask_col.png \( "' + sticker_photo_input + '" -resize 1536x2048^ \) -compose overlay -composite commands/mask_col.png -composite commands/outtemp.png';

                            var sticker_command_last = 'cconvert commands/outtemp.png -font Whitney-Semibold -weight 700  -pointsize 70 -draw "fill black text 300,1860 \'' + sticker_name.toUpperCase();
                            sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 100,1900 \'' + 'CALLTECH S.A.';
                            sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 800,1710 \'' + '20-04-2018';
                            sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 200,315 \'' + '2018';
                            sticker_command_last += '\' " ' + sticker_photo_output;
                            
                            //
                            // Execute the first command
                            //
                            console.log(">>>Command1 Start: " + date_format(new Date(), "h:MM:ss"));
                            console.log("Command: " + sticker_command_first);
                            var imageMagick_first = exec(sticker_command_first,
                                (error, stdout, stderr) => {
                                    console.log(`${stdout}`);
                                    console.log(`${stderr}`);
                                    console.log(">>>Command1 End: " + date_format(new Date(), "h:MM:ss"));

                                    //
                                    // Execute the second command
                                    //
                                    console.log(">>>Command2 Start: " + date_format(new Date(), "h:MM:ss"));
                                    console.log("Command: " + sticker_command_last);
                                    var imageMagick_last = exec(sticker_command_last,
                                        (error, stdout, stderr) => {
                                            console.log(`${stdout}`);
                                            console.log(`${stderr}`);
                                            console.log(">>>Command End: " + date_format(new Date(), "h:MM:ss"));

                                            //
                                            // Reply the image
                                            //
                                            bot.reply(message, {text:'Here is your Sticker, share with your friends on the social media click on share', files:[process.env.PUBLIC_URL + '/' + file_info['filename'].slice(0, -4) + "_sticker.png"]} );        

                                            if (error !== null) {
                                                console.log(`exec error: ${error}`);
                                            }
                                        });

                                    if (error !== null) {
                                        console.log(`exec error: ${error}`);
                                    }
                                });
                        });
                    });
                }
            });
        }
    });
}
