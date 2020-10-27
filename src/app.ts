import express, { Application, Request, Response } from 'express';
import Bot from './Bot';
import Redis from './Redis';
import { SmsMessage } from './interfaces';

const app: Application = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const redis = new Redis("redis://default:R5gwijdJf0NDPOGe0JHqFJYgRGXqwGYo@redis-11284.c233.eu-west-1-1.ec2.cloud.redislabs.com:11284")
const bot = new Bot("1134203526:AAG7R2jA2HSMoXmD7cF9jfPyaIWMhEH8lbI", redis);

app.get('/', (req : Request, res : Response) => {
  res.send(`Bot works.`);
});

app.post('/messages', (req : Request, res : Response) => {
  const sms = req.body as SmsMessage;
  if (sms.from === '900') {
    console.log(sms)
  }
  res.send('OK')
});

app.listen(port, () => {
  console.log(`> App listening on port ${port}`)
});