//
// Welcome message 
// sent as the bot is added to a Cisco Spark space
//
module.exports = function (controller) {

    controller.on('bot_space_join', function (bot, event) {

        var welcome  = "#⚽⚽ WorldCup FIFA 2018 Trivia ⚽⚽";
        welcome += `\n###Hi <@personId:${event.actorId}>, so glad meeting you!`;
        welcome += "\n###Are you ready to challenge your knowledge in soccer players and FIFA World Cup?";
                
        if (this.identity) {
            welcome += `<br/>I am the **${this.identity.displayName}** bot`;
        }

        bot.say ({
            text: welcome,
            channel: event.channel
        }, function (err, rawMessage) {
            if (err) {
                console.log("Error while posting back welcome message, err: " + err.message)
                return;
            }

            var help = "To start the challenge, type `help`";

            if (rawMessage.roomType == "group") {
                help = "Note that this is a 'Group' Space. I will answer only if mentionned.<br/>";
                help += "To start the challenge, type " + bot.appendMention(rawMessage, "help");
            }

            bot.say({
                text: `_${help}_`,
                channel: rawMessage.roomId
            }, function (err, messageAck) {
                if (err) {
                    console.log("Error while posting back help message, err: " + err.message)
                    return;
                }
            });
        });
    });
}
