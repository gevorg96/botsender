import { IMessageRexExps } from "./interfaces";

const getMessages = () => {
    let keyValues = {
        "/greetings": `Привет! Я бот-рассыльщик. Одно моё сообщение стоит 0.10 рублей. 
Пополни счёт на нужную тебе сумму, и я накручу счётчик доступных тебе сообщений.
Чтобы отправить сообщение, вызови команду /send`,

        "/groupname": `Введите имя группы в формате @groupName:`,
        "/messagecount": `Введите количество пользователей, которым хотите разослать сообщения:`,
        "/test": `Бот активен`,
        "/start": ''
    }

    keyValues["/start"] = keyValues["/greetings"];

    return keyValues;
}

const getRoutes = () => {
    return [
        /start/,
        /greetings/,
        /groupname/,
        /messagecount/,
        /test/
      ]      
}

const result: IMessageRexExps = {
    messages: getMessages(), 
    routes: getRoutes()
}

export default (result);