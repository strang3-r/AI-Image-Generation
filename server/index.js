import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
	res.status(200).json({
		message: 'Hello fromm DALL-E!',
	});
});

const PORT = 8080;

const startServer = async (req, res) => {

	try{
		connectDB(process.env.MONGODB_URL);
		app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`))
	}catch(error){
		console.log(error)
	}

}

startServer();