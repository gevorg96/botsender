const TelegramBot = require('node-telegram-bot-api');
import express, {Application, Request, Response, NextFunction} from 'express';
import { IMessage, IMatch } from './interfaces';
import MessageRoute from './messages';

const app: Application = express();
const bot = new TelegramBot('1134203526:AAG7R2jA2HSMoXmD7cF9jfPyaIWMhEH8lbI', { polling: true });

const sendMessage = (message: IMessage) => {
  var fromId = message.from.id;
  bot.sendMessage(fromId, MessageRoute.messages[message.text])
}

MessageRoute.routes.forEach(x => bot.onText(x, (msg : IMessage, match : IMatch) => sendMessage(msg)))

app.get('/', (req : Request, res : Response) => {
  res.send('Bot works.')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening...`)
})