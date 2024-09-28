import { Request, Response } from 'express';
import sendLogMessage from '../utils/publisher';

const publishBody = (req: Request, res: Response) => {
	try {
		sendLogMessage(req.body);

		res.status(200).send({
			success: true,
			message: 'Log sent to queue successfully',
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default { publishBody };
