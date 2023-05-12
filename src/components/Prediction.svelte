<script lang="ts">
	import pikachu from '../assets/pikachu.gif';
	import sleapingPikachu from '../assets/pikachu-pokémon.gif';
	import Active from './status/Active.svelte';
	import Canceled from './status/Canceled.svelte';
	import Locked from './status/Locked.svelte';
	import Resolved from './status/Resolved.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Guide from './Guide.svelte';
	import { animationLength, clientId } from '../helpers/config';
	import getPredictions from '../helpers/twitch-api';
	import type { FetchData } from '../helpers/interfaces';

	$: clientIdParam = $page.url.searchParams.get('clientID');
	$: auth = $page.url.searchParams.get('auth');
	$: authHash = $page.url.hash.split('&')[0].split('=')[1];
	let errorText: string;

	onMount(async () => {
		if (authHash) {
			window.location.href = '/predictions?clientID=' + clientId + '&auth=' + authHash;
		}
		if (clientIdParam && auth) {
			const interval = setInterval(async () => {
				if (typeof clientIdParam === 'string' && typeof auth === 'string') {
					let dataA: FetchData;
					try {
						dataA = await getPredictions(clientIdParam, auth);
						if (dataA) {
							errorText = '';
							currentStatus = dataA.status;
							setTimeout(() => {
								delayedStatus = dataA.status;
								delayedData = dataA;
							}, animationLength);
						}
					} catch (error: any) {
						errorText = error.message;
					}
				}
			}, 1000);
			return () => {
				clearInterval(interval);
			};
		}
	});
	let delayedStatus: string = '';
	let currentStatus: string;
	let delayedData: FetchData;
</script>

<svelte:head>
	<link rel="preload" as="image" href={sleapingPikachu} />
</svelte:head>

{#if !authHash && (!clientIdParam || !auth)}
	<Guide />
{:else if errorText}
	{#if errorText === 'Failed to fetch'}
		<img
			style="padding-top: 50px; width: 50px; height: 50px;"
			src={sleapingPikachu}
			alt="Error..."
		/>
	{:else}
		<h1 style="color: red">{errorText}</h1>
	{/if}
{:else if !currentStatus && !errorText && !currentStatus}
	<img style="padding-top: 50px; width: 50px; height: 50px;" src={pikachu} alt="Loading..." />
{:else if delayedStatus === 'ACTIVE'}
	<Active status={currentStatus} data={delayedData} />
{:else if delayedStatus === 'LOCKED'}
	<Locked status={currentStatus} data={delayedData} />
{:else if delayedStatus === 'CANCELED'}
	<Canceled status={currentStatus} data={delayedData} />
{:else if delayedStatus === 'RESOLVED'}
	<Resolved status={currentStatus} data={delayedData} />
{/if}
