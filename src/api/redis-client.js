import redis from 'redis';

let client = null;

function setup() {
	if (process.env.REDISCLOUD_URL) {
		console.log('connecting to redis cloud');
		client = redis.createClient(process.env.REDISCLOUD_URL);
	} else {
		console.log('connecting to local redis');
		client = redis.createClient();
	}

	client.on('connect', function(){
		console.log('redis client emitted connect event');
	});
	client.on('error', function(err){
		console.error(err, 'redis error');
	});
}

const redisKeys = {
	users: 'users|5',
	contactsByUser(handle) {
        return `contacts|${handle}|1`;
    }
};

export {setup as setupRedis, client as redisClient, redisKeys};