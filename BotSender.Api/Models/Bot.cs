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
            var hook = AppSettings.Url + "api/message/update";
            await client.SetWebhookAsync(hook);

            return client;
        }

        public static async Task HandleUpdatesAsync()
        {
            while(true)
            {
                await Task.Delay(500);
                var c = await Get();
                var updates = await c.GetUpdatesAsync(0, 100, 0);
                foreach (var update in updates)
                {
                    if (update == null) continue;

                    var commands = Commands;
                    var message = update.Message;

                    foreach (var command in commands)
                    {
                        if (command.Contains(message.Text))
                        {
                            await command.Execute(message, c);
                            break;
                        }
                    }
                }
            }
            
        }
    }
}
