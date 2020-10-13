using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace BotSender.Api.Models.Commands
{
    public abstract class Command
    {
        private readonly AppSettings appSettings;

        public Command(AppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        public abstract string Name { get; }

        public abstract Task Execute(Message message, TelegramBotClient client);

        public bool Contains(string command)
        {
            return command.Contains(this.Name) && command.Contains(appSettings.Name);
        }
    }
}
