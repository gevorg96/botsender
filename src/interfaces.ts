export interface IMessage {
    message_id: number,
    from: IFrom,
    chat: IChat,
    date: Date,
    text: string,
    entities: IEntity[]
}

export interface Identified {
    id: number
}

export interface IFrom extends Identified {
    is_bot: boolean,
    first_name: string,
    username: string,
    language_code: string
};

export interface IChat extends Identified {
    first_name: string,
    username: 'gevkes',
    type: string
};

export interface IEntity {
    offset: number,
    length: number,
    type: string
}

export interface IMatch {
    index: number,
    input: string,
    groups: any
}

export interface IMessageRexExps {
    messages: any,
    routes: RegExp[]
}