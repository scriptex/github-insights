// @ts-nocheck

const express = require('express');

const { getClient } = require('./helpers');
const { getInsightsFromClient } = require('./get-insights');

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
