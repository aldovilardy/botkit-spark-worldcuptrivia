![botlogo](resources/icon.png){:class="img-responsive"}


# botkit-spark-worldcuptrivia
[![license](https://img.shields.io/github/license/diegofn/botkit-spark-worldcuptrivia.svg)](https://github.com/diegofn/botkit-spark-worldcuptrivia/blob/master/LICENSE)

World Cup 2018 Trivia Bot for Cisco Spark.

## Features
- Bot conversation using [Botkit](https://ngrok.com) and [CiscoSpark JavaScript SDK](https://github.com/ciscospark/spark-js-sdk/)
- About and help skills available.


## Installation

1. Download the ngrok or tunneling localhost tool i.e. [ngrok](https://ngrok.com)

2. Register a Bot Account from the ['Spark for developers' bot creation page](https://developer.ciscospark.com/add-bot.html), and copy your bot's access token.

3. Launch ngrok to expose port 3000 of your local machine to the internet:

    ```
    ngrok http 3000
    ```
4. Edit the `.env` file and modify the settings to accomodate your bot.

    ```
    PORT=3000
    PUBLIC_URL=https://custom-sub-domain.ngrok.io
    SECRET="hiddensecret"
    SPARK_TOKEN=token-received-from-access-token
    ```
5. Run the bot and test it.
    
    ```shell
    git clone https://github.com/diegofn/botkit-spark-worldcuptrivia
    cd botkit-spark-worldcuptrivia
    npm install
    node worldcuptrivia.js
    ```

# Project resources

- [Source code](https://github.com/diegofn/botkit-spark-worldcuptrivia)
- [Issue tracker](https://github.com/diegofn/botkit-spark-worldcuptrivia/issues>)

# Credits

- [Original author](https://github.com/diegofn)
- [Current maintainer](https://github.com/diegofn)
- [Contributors](https://github.com/diegofn/botkit-spark-worldcuptrivia/graphs/contributors)