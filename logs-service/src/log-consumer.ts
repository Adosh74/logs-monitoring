import { Client } from '@elastic/elasticsearch';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';
import amqp from 'amqplib';

const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
const esHost = process.env.ELASTICSEARCH_HOST || 'http://localhost:9200';
const exchangeName = 'logs_exchange';
const queueName = 'logs_queue';
const esClient = new Client({ node: esHost });

(async () => {
	try {
		const connection = await amqp.connect(`amqp://${rabbitmqHost}`);
		const channel = await connection.createChannel();

		await channel.assertExchange(exchangeName, 'topic', { durable: true });
		await channel.assertQueue(queueName, { durable: true });

		await channel.bindQueue(queueName, exchangeName, 'logs.info');

		console.log('Waiting for messages in queue:', queueName);

		channel.consume(
			queueName,
			async (msg) => {
				if (msg) {
					const logMessage = JSON.parse(msg.content.toString());
					console.log('Received log:', logMessage);

					await esClient
						.index({
							index: 'logs',
							body: logMessage,
						})
						.then((value: WriteResponseBase) => {
							console.log('log saved in elasticsearch', value);
						});

					channel.ack(msg);
				}
			},
			{ noAck: false }
		);
	} catch (error) {
		console.error('Error starting logging service:', error);
	}
})();
