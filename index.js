var TelegramBot = require('node-telegram-bot-api');
var express = require('express');
const app = express()

app.get('/', (req, res) => {
  res.send('Bot works.')
})

app.listen(3000, () => {
  console.log(`App listening...`)
})

var token = '1134203526:AAG7R2jA2HSMoXmD7cF9jfPyaIWMhEH8lbI';

var bot = new TelegramBot(token, { polling: true });

bot.onText(/command1/, function (msg, match) {
    var fromId = msg.from.id; 
    bot.sendMessage(fromId, "Тест пройден!!!");
});
