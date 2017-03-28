import {redisClient, redisKeys} from './redis-client';
import {UserValidator} from '../core/user-validator';
import jwt from 'jsonwebtoken';

const handleSecret = 'some-secret-shhh'; //need to change before 

function setup(app) {
	app.get('/', (req, res) => {
		res.send('Hello! This is my Express page on port 4000.');
	});

	app.get('/redis-test', (req, res) => {
		redisClient.incr('inc-test', (err, result) => {
			if (err) {
				console.error(err);
				res.send('Error connecting to redis');
			}
			else {
				res.send(`New incremented value: ${result}`);
			}
		});
	});

	app.get('/json-test', (req, res, next) => {
		redisClient.incr('inc-json-test', (err, result) => {
			if (err) {
				next(err);
			}
			else {
				res.json({ incResult: result });
			}
		});
	});

	app.post('/user', (req, res, next) => {
		console.log('user', req.body);

		const {handle, name} = req.body;

		const user = {
			handle,
			name
		};

		redisClient.lrange(redisKeys.users, 0, -1, (err, result) => {
			if (err) {
				next(err);
			}
			else {
				const validator = new UserValidator(user);
				const existingUsers = result.map(JSON.parse);

				const errors = validator.validate(existingUsers);

				if (errors.length > 0) {
					res.status(400).send(errors.join(','));
				}
				else {
					redisClient.lpush(redisKeys.users, JSON.stringify(user), (err, result) => {
						if (err) {
							next(err);
						}
						else {

							const token = jwt.sign({ handle }, handleSecret);

							res.json({
								token: `Bearer ${token}`
							});

							//res.send(`User saved to redis. Number of users: ${result}.`);
						}
					});
				}
			}
		});
	});

	app.get('/users/:max', (req, res, next) => {

		redisClient.lrange(redisKeys.users, 0, req.params.max, (err, result) => {
			if (err) {
				next(err);
			}
			else {
				console.log('users', result);
				res.json(result.map(JSON.parse));
			}
		});
	});

	app.get('/user/verify', verifyAuthorizationToken, (req, res, next) => {
		res.send(req.user.handle);
	});

	app.post('/contact', verifyAuthorizationToken, (req, res, next) => {
		console.log('POST /Contact', req.body);

		const sender = req.user.handle;
		const receiver = req.body.handle;

		redisClient.lpush(redisKeys.contactsByUser(sender), receiver, (err, result) => {
			if (err) {
				next(err);
			} else {
				const fact = {
					type: 'added-as-contact',
					data: {
						sender, 
						receiver
					}
				};
				sockets.emitUserFact(receiver, fact);

				res.json(fact);
			}
		});
	});

	app.get('/contact', verifyAuthorizationToken, (req, res, next) => {
		console.log('GET /contact', req.body);

		const sender = req.user.handle;

		redisClient.lpush(redisKeys.contactsByUser(sender), 0, -1, (err, result) => {
			if (err) {
				next(err);
			} else {
				res.json(result);
			}
		});
	});

	app.post('/message', verifyAuthorizationToken, (req, res, next) => {
		console.log('POST /message', req.body);

		const fact = req.body;
		const { receiver } = fact.data;

		sockets.emitUserFact(receiver, fact);
		res.json(fact);
	});

	app.post('acknowledge', verifyAuthorizationToken, (req, res, next) => {
		console.log('POST /acknowledge', req.body);

		const sender = res.user.handle;
		const { receiver, messageId } = req.body;
		const fact = {
			type: 'ack-sent',
			data: {
				sender,
				receiver,
				messageId
			}
		};
		sockets.emitUserFact(receiver, fact);

		res.json(fact);
	});
}

function verifyAuthorizationToken(req, res, next) {
	const bearerToken = req.header('Authorization');
	const token = jwt.extractToken(bearerToken);

	let decoded;

	try {
		decoded = jwt.verify(token);
	}
	catch(err) {
		res.status(401).send('invalid-auth-token');
		return;
	}

	req.user = req.user || {};
	req.user.handle = decoded.handle;
	next();
}

export {setup as setupRoutes}