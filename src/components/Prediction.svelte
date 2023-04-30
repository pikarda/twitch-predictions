<script lang="ts">
	import pikachu from '../assets/pikachu.gif';
	import sleapingPikachu from '../assets/pikachu-pokémon.gif';
	import Active from './status/Active.svelte';
	import Canceled from './status/Canceled.svelte';
	import Locked from './status/Locked.svelte';
	import Resolved from './status/Resolved.svelte';
	import { timeoutedStatus } from '../store/prediction-store';
	import predictionsData from '../store/prediction-store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Guide from './Guide.svelte';
	import { clientId } from '../helpers/config';

	$: clientIdParam = $page.url.searchParams.get('clientID');
	$: auth = $page.url.searchParams.get('auth');
	$: authHash = $page.url.hash.split('&')[0].split('=')[1];
	let status: string;
	let errorText: string;

	onMount(async () => {
		if (authHash) {
			window.location.href = '/predictions?clientID=' + clientId + '&auth=' + authHash;
		}
		if (clientIdParam && auth) {
			try {
				await predictionsData.getPredictions(clientIdParam, auth);
			} catch (err: any) {
				errorText = err;
			}
			const unsubscribe = predictionsData.subscribe((d) => {
				status = d.status;
			});
			const interval = setInterval(() => {
				if (typeof clientIdParam === 'string' && typeof auth === 'string') {
					try {
						predictionsData.getPredictions(clientIdParam, auth);
					} catch (err: any) {
						errorText = err;
					}
				}
			}, 1000);
			return () => {
				clearInterval(interval);
				unsubscribe();
			};
		}
	});
</script>

{#if !authHash && (!clientIdParam || !auth)}
	<Guide />
{:else}
	{#if errorText}
		<h1 style="color: red">{errorText}</h1>
	{/if}
	{#if !status && !errorText && !$timeoutedStatus}
		<img style="padding-top: 50px; width: 50px; height: 50px;" src={pikachu} alt="Loading..." />
	{:else if $timeoutedStatus === 'ACTIVE'}
		<Active />
	{:else if $timeoutedStatus === 'LOCKED'}
		<Locked />
	{:else if $timeoutedStatus === 'CANCELED'}
		<Canceled />
	{:else if $timeoutedStatus === 'RESOLVED'}
		<Resolved />
	{:else if $timeoutedStatus === 'ERROR' && !errorText}
		<img
			style="padding-top: 50px; width: 50px; height: 50px;"
			src={sleapingPikachu}
			alt="Error..."
		/>
	{/if}
{/if}
