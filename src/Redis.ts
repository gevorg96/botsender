import redis = require('redis');

export default class Redis {
    private redisClient: redis.RedisClient | undefined = undefined;

    constructor(url: string) {
        this.redisClient = redis.createClient(url);
        this.redisClient.on('connect', () => console.log('> Redis connected'));
    }

    setValue = (id: string, value: string) => {
        this.redisClient?.set(id, value, this.processResult);
    }
      
    delValue = (id: string) => {
        this.redisClient?.del(id, this.processResult);
    }

    getValue = (id: string) => {
        this.redisClient?.get(id, this.processResult);
    }

    processResult<T>(err: Error | null, x: T) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(x)
        }
    }
}


