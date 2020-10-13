using BotSender.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Bot.Types;

namespace BotSender.Api.Controllers
{
    [ApiController]
    [Route("api/message/update")]
    public class MessageController: Controller
    {
        static List<Update> updates = new List<Update>();


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(updates);
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] Update update)
        {
            updates.Add(update);
            if (update == null) return Ok();

            var commands = Bot.Commands;
            var message = update.Message;
            var client = await Bot.Get();

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
