import express from 'express';
import routes from './routes/index.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check endpoint
app.get('/healthz', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Publisher service is running',
	});
});

// Routes
app.use('/api/v1', routes);

export default app;
