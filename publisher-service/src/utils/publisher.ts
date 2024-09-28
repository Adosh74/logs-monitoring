import amqp from 'amqplib';

const sendLogMessage = async (log: object) => {
	const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
	const exchangeName = 'logs_exchange';
	try {
		const connection = await amqp.connect(`amqp://${rabbitmqHost}`);
		const channel = await connection.createChannel();

		await channel.assertExchange(exchangeName, 'topic', { durable: true });


		const routingKey = 'logs.info';
		channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(log)));
		console.log('Log sent:', log);

		setTimeout(() => connection.close(), 500); 
	} catch (error) {
		console.error('Failed to send log to RabbitMQ', error);
	}
};

export default sendLogMessage;
