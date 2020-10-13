using BotSender.Api.Models.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;

namespace BotSender.Api.Models
{
    public static class Bot
    {
        private static TelegramBotClient client;
        public static IReadOnlyList<Command> Commands { get; private set; }

        public static async Task<TelegramBotClient> Get()
        {
            if (client != null)
            {
                return client;
            }

            Commands = new List<Command>();
            Commands.Append(new HelloCommand());

            client = new TelegramBotClient(AppSettings.Key);
            var hook = string.Format(AppSettings.Url, "api/message/update");
            await client.SetWebhookAsync(hook);

            return client;
        }
    }
}
