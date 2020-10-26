import MessageRoute from './messages';
import { IMessage, IMatch } from './interfaces';
import RedisRegistration from './Redis';
import TelegramBot from './TelegramBot';

export default class Bot {
    private bot: TelegramBot | undefined = undefined;
    private redis: RedisRegistration | undefined = undefined;

    constructor(apiKey: string, redisClient: RedisRegistration) {
        this.bot = new TelegramBot(apiKey, { polling: true });
        this.redis = redisClient;
        MessageRoute.routes.forEach(x => this.bot.onText(x, (msg : IMessage, match : IMatch) => this.sendMessage(msg)))
    }

    private sendMessage = (message: IMessage) => {
        var fromId = message.from.id
        this.redis?.setValue(fromId.toString(), message.text);
        this.bot.sendMessage(fromId, MessageRoute.messages[message.text])
    };
}