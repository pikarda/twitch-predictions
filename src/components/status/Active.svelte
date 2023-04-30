<script lang="ts">
	import { onMount } from 'svelte';
	import Outcomes from '../Outcomes.svelte';
	import { divT, divT2, initialOpacity, time, title } from './Status.styles';
	import { barWidth } from '../../helpers/config';
	import predictionsData from '../../store/prediction-store';
	import { timeoutedStatus } from '../../store/prediction-store';

	onMount(() => {
		const unsubscribe = predictionsData.subscribe((data) => {
			titleText = data.title;
			status = data.status;
			remainingTime =
				+data.remainingTime - Math.floor(+data.remainingTime / 60) * 60 < 10
					? `${
							Math.floor(+data.remainingTime / 60).toString() +
							':0' +
							(+data.remainingTime - Math.floor(+data.remainingTime / 60) * 60)
					  }`
					: `${
							Math.floor(+data.remainingTime / 60).toString() +
							':' +
							(+data.remainingTime - Math.floor(+data.remainingTime / 60) * 60)
					  }`;
		});
		return () => {
			unsubscribe();
		};
	});

	let classes: string = '';
	let titleText: string;
	let remainingTime: string;
	let status: string;

	$: if (status === 'ACTIVE') {
		classes = divT;
	} else if (status !== 'ACTIVE') {
		classes = divT2;
	}
</script>

<div class={classes || initialOpacity} style="width: {barWidth}px">
	<h2 class={title}>{titleText}</h2>
	<p class={time}>{remainingTime}</p>
	<Outcomes status={$timeoutedStatus} />
</div>
