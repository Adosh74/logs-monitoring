import app from './app';

(async () => {
	app.listen(3001, () => {
		console.log('Server started on port 3001');
	});
})();
