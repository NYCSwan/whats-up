import createSocketIoServer from 'socket.io';
import {socketEvents} from '../core/socket-events';
import {redisClient, redisKeys} from './redis-client';
import {SocketUtils} from '../core/socket-utils';
import {jwt} from './jwt-wrapper';

class Sockets {
	constructor(httpServer) {
		this._io = createSocketIoServer(httpServer);
	}

	setupUserNamespace(handle) {
		const namespace = SocketUtils.getUseNamespace(handle);
		const userSocket = this._io.of(namspace);

		userSocket.use(verifyAuthorizationToken);

		console.log(`server connected  on ${namespace}`);

		userSocket.on('connection', function(socket){
			console.log('socket:', socket);
			console.log(`socket connected on ${socket.nsp.name}`);
		});
	}

	emitUserFact(handle, fact) {
		const namespace = SocketUtils.connectToUserSocket(handle);
		console.log(`server emitting fact on ${namespace}`, fact);

		const userSocket = this._io.of(namespace);
		userSocket.emit(socketEvents.fact, fact);
	}
}

function verifyAuthorizationToken(socket, next) {
	let err;
	const bearerToken = socket.handshake.query.token;

	if (bearerToken) {
		const token = jwt.extractToken(bearerToken);

		try {
			jwt.verify(bearerToken);
		} 
		catch (e) {
			err = new Error('invalid authToken for user socket');
		}
	} else {
		err = new Error('no bearerToken found in query string for user socket');
	}

	if(err) {
		console.log(err, socket.nsp.name);
		next(err);
	} else {
		console.log(`client socket connection verified on ${socket.nsp.name}`);
		next();
	}
}

let sockets;

function setupSockets(httpServer) {
	sockets = new Sockets(httpServer);

	redisClient.lrange(redisKeys.users, 0, -1, (err, result) => {
		if (err) {
			console.log('could not read users to setup sockets');
		} else {
			const users = result.map(JSON.parse);
			for(const user of users) {
				sockets.setupUserNamespace(user.handle);
			}
		}
	});
}

export {setupSockets, sockets}