import { writable, type Writable } from 'svelte/store';
import getPredictions from '../helpers/twitch-api';
import { animationLength } from '../helpers/config';
import type { FetchData } from '../helpers/interfaces';

const store: Writable<FetchData> = writable();

export const timeoutedStatus = writable('');

const predictionsData = {
	subscribe: store.subscribe,
	getPredictions: async (clientId: string, auth: string) => {
		try {
			const data = await getPredictions(clientId, auth);
			store.set(data);
			setTimeout(() => {
				timeoutedStatus.set(data.status);
			}, animationLength);
		} catch (error: any) {
			timeoutedStatus.set('ERROR');
			throw new Error(error.message);
		}
	}
};

export default predictionsData;
