import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send("Hey-o REACT. I got this!");
});

app.listen(port, () => {
	console.log(`Express app listening on port: ${port}`);
});