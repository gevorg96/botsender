using BotSender.Api.Models.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;

namespace BotSender.Api.Models
{
    public class Bot
    {
        private TelegramBotClient client;
        private readonly AppSettings appSettings;
        public IReadOnlyList<Command> Commands { get; private set; }

        public Bot(AppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        public async Task<TelegramBotClient> Get()
        {
            if (client != null)
            {
                return client;
            }

            Commands = new List<Command>();
            Commands.Append(new HelloCommand(appSettings));

            client = new TelegramBotClient(appSettings.Key);
            var hook = string.Format(appSettings.Url, "api/message/update");
            await client.SetWebhookAsync(hook);

            return client;
        }
    }
}
