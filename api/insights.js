import express from 'express';

import { getClient } from './helpers.js';
import { getInsightsFromClient } from './get-insights.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.listen(3000);

app.post('/insights', async (req, res) => {
	const { repository } = req.body;

	if (!repository) {
		return res.status(400).send({
			message: 'Invalid or missing repository.'
		});
	}

	try {
		const insights = await getInsightsFromClient(getClient(process.env.TOKEN), [repository]);

		return res.json(insights);
	} catch (e) {
		return res.status(e.status).send({ message: e.statusText });
	}
});
