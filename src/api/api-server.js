import express from 'express';
import {setupRedis} from './redis-client';
import {setupRoutes} from './routes';
import {setupSockets} from './sockets';

import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors()); //allows CORS; resources shared btwn diff domains for express
console.log('cors allowed for all routes');
app.use(bodyParser.json());

const port = process.env.PORT || 4000;


setupRedis();
setupRoutes(app);

const httpServer = app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});

setupSockets(httpServer);