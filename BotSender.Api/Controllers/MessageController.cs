using BotSender.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot.Types;

namespace BotSender.Api.Controllers
{
    [ApiController]
    public class MessageController: Controller
    {
        private readonly Bot bot;

        public MessageController(Bot bot)
        {
            this.bot = bot;
        }

        [Route("api/message/update")]
        public async Task<IActionResult> Update([FromBody] Update update)
        {
            var commands = bot.Commands;
            var message = update.Message;
            var client = await bot.Get();

            foreach (var command in commands)
            {
                if (command.Contains(message.Text))
                {
                    await command.Execute(message, client);
                    break;
                }
            }

            return Ok();
        }
    }
}
