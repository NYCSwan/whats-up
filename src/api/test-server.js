import http from 'http';

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello React Class\n This is exciting!');
});

server.listen(port, () => {
	console.log(`Server running at port ${port}.`);
});