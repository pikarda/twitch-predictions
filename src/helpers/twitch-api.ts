import type { FetchData } from './interfaces';
import { clientId } from '../helpers/config';

export const getId = async (auth: string) => {
	const response = await fetch('https://api.twitch.tv/helix/users', {
		headers: {
			Authorization: 'Bearer ' + auth,
			'Client-Id': clientId
		}
	});
	const data = await response.json();
	return { id: data.data[0].id, login: data.data[0].login };
};

const getPredictions = async (clientId: string, auth: string, PredictionsAmount: number = 1) => {
	const response = await fetch(
		'https://api.twitch.tv/helix/predictions?broadcaster_id=' +
			(
				await getId(auth)
			).id +
			'&first=' +
			PredictionsAmount,
		{
			headers: {
				Authorization: 'Bearer ' + auth,
				'Client-Id': clientId
			}
		}
	);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(`${data.message}. | Status code: ${data.status}`);
		// throw new Error(`bla`);
	}

	const predictionData: FetchData = {
		title: data.data[0].title,
		winning_outcome_id: data.data[0].winning_outcome_id,
		status: data.data[0].status,
		remainingTime: (
			(new Date(data.data[0].created_at).getTime() +
				data.data[0].prediction_window * 1000 -
				new Date().getTime()) /
			1000
		).toFixed(),
		outcomes: data.data[0].outcomes,
		createdAt: data.data[0].created_at
	};

	return predictionData;
};

export default getPredictions;
