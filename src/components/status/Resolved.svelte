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
			amountOfPointsWinned = data.outcomes
				.filter((element) => element.id !== data.winning_outcome_id)
				.reduce((acc, curr) => acc + curr.channel_points, 0);
			winner = data.winning_outcome_id;
		});
		return () => {
			unsubscribe();
		};
	});

	let classes: string = '';
	let titleText: string;
	let amountOfPointsWinned: number;
	let winner: string;
	let status: string;

	$: if (status === 'RESOLVED') {
		classes = divT;
		setTimeout(() => {
			classes = divT + ' ' + resolvedFadeout;
		}, animationLength);
	} else if (status !== 'RESOLVED') {
		classes = resolvedFadeout + ' ' + divT2;
	}
</script>

<div class={classes || initialOpacity} style="width: {barWidth}px">
	<h2 class={title}>{titleText}</h2>
	<p class={time}>{amountOfPointsWinned} points goes to the winners</p>
	<Outcomes status={$timeoutedStatus} {winner} />
</div>
