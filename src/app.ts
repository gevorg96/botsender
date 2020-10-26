import express, {Application, Request, Response, NextFunction} from 'express';
import Bot from './Bot';
import Redis from './Redis';

const app: Application = express();

const redis = new Redis("redis://default:R5gwijdJf0NDPOGe0JHqFJYgRGXqwGYo@redis-11284.c233.eu-west-1-1.ec2.cloud.redislabs.com:11284")
const bot = new Bot("1134203526:AAG7R2jA2HSMoXmD7cF9jfPyaIWMhEH8lbI", redis);

interface Message {
  phone: string | undefined,
  text: string | undefined
}

let messages: Message[] = [];

let mess: any[] = []

app.get('/', (req : Request, res : Response) => {
  res.send(`Bot works. \n` + messages.map(x => `${x.phone}: ${x.text}.\n`) + mess.map(x => x.toString()));
});

app.get('/messages', (req : Request, res : Response) => {
  
  const mess: Message = {
    phone: req.query.phone?.toString(),  
    text: req.query.text?.toString()
  }

  // const mess: Message = {
  //   phone: "123",  
  //   text: "432423423"
  // }

  messages = messages.concat(mess);
  res.end('OK');
});

async function readBody (req: Request) {
  return await req.body.toJSON();
}

app.post('/messages', (req : Request, res : Response) => {
  const body = readBody(req).then(x => {
    mess = mess.concat(x);
    console.log(JSON.stringify(x));  
  });
  res.send('OK')
});

app.get('/deleteKeys', (req : Request, res : Response) => {
  redis.delValue("ccccc");
  res.send('All keys were deleted.')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`> App listening on port ${port}`)
});