<script lang="ts">
	import { onMount } from 'svelte';
	import Outcomes from '../Outcomes.svelte';
	import { divT, divT2, initialOpacity, time, title, resolvedFadeout } from './Status.styles';
	import { barWidth, animationLength } from '../../helpers/config';
	import predictionsData from '../../store/prediction-store';
	import { timeoutedStatus } from '../../store/prediction-store';

	onMount(() => {
		const unsubscribe = predictionsData.subscribe((data) => {
			titleText = data.title;
			status = data.status;
		});
		return () => {
			unsubscribe();
		};
	});

	let classes: string = '';
	let titleText: string;
	let status: string;

	$: if (status === 'CANCELED') {
		classes = divT;
		setTimeout(() => {
			classes = divT + ' ' + resolvedFadeout;
		}, animationLength);
	} else if (status !== 'CANCELED') {
		classes = resolvedFadeout + ' ' + divT2;
	}
</script>

<div class="{classes || initialOpacity} " style="width: {barWidth}px">
	<h2 class={title}>{titleText}</h2>
	<p class={time}>Prediction Canceled</p>
	<Outcomes status={$timeoutedStatus} />
</div>
