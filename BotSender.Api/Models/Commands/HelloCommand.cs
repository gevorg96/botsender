using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace BotSender.Api.Models.Commands
{
    public class HelloCommand : Command
    {
        public override string Name => "hello";

        public override async Task Execute(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;
            var messageId = message.MessageId;

            await client.SendTextMessageAsync(chatId, "hello!", replyToMessageId: messageId);
        }
    }
}
