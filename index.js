var TelegramBot = require('node-telegram-bot-api');
var token = '1134203526:AAG7R2jA2HSMoXmD7cF9jfPyaIWMhEH8lbI';

var bot = new TelegramBot(token, { polling: true });

bot.onText(/command1/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    bot.sendMessage(fromId, "test пройден!");
});
