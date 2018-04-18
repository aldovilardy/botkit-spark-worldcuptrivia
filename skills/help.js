//
// Command: help
//
var emoji = require('node-emoji');
const exec = require('child_process').exec;

module.exports = function (controller) {

    controller.hears([/^help$/i], 'direct_message,direct_mention', function (bot, message) {
        var text = "😊 I understand:";
        text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself 🤖";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills 🤖";
        text += "\n- " + bot.appendMention(message, "gift") + ": receive a free player sticker 🎁";
        
        //
        // Create the sticker
        // Windows style
        //
        var sticker_command_first = 'cconvert commands/mask_col.png \( ' + '"public/' + 'IMG_0079.jpg' + '" -resize 1536x2048^ \) -compose overlay -composite commands/mask_col.png -composite commands/outtemp.png';
        console.log(sticker_command_first);

        var sticker_command_last = 'cconvert commands/outtemp.png -font Whitney-Semibold -weight 700  -pointsize 70 -draw "fill black text 300,1860 \'' + 'Diego Nieto';
        sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 100,1900 \'' + 'Calltech';
        sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 800,1710 \'' + '17-03-1983';
        sticker_command_last += '\' " -pointsize 50 -draw "gravity northeast fill black text 200,315 \'' + '2010';
        sticker_command_last += '\' " ' + 'public/IMG_0079.jpg.png';
        console.log(sticker_command_last);

        
        var imageMagick_first = exec(sticker_command_first,
            (error, stdout, stderr) => {
                console.log(`${stdout}`);
                console.log(`${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

        var imageMagick_last = exec(sticker_command_last,
                (error, stdout, stderr) => {
                    console.log(`${stdout}`);
                    console.log(`${stderr}`);
                    if (error !== null) {
                        console.log(`exec error: ${error}`);
                    }
                });
    
        //
        // Sleep while execute a process
        //
        const delay = require('delay');
        delay(5000)
            .then(() => {
                bot.reply(message, text);
            });
        
    });
}
