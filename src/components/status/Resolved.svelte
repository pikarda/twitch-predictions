<script lang="ts">
	import { onMount } from 'svelte';
	import { lose, divTitle, divPoints, pointsIcon, mainDiv } from '../Outcome.styles';
	import Bar from '../UI/Bar.svelte';
	import image from '../../assets/svgexport-6.svg';
	import type { FetchData } from '../../helpers/interfaces';
	import { divT, divT2, initialOpacity, time, title, resolvedFadeout } from './Status.styles';
	import { barWidth, animationLength } from '../../helpers/config';

	let classes: string = '';
	let amountOfPointsWinned: number;
	let winner: string;
	let calculatedPoints: string;
	export let status: string = 'RESOLVED';
	export let data: FetchData;

	onMount(() => {
		classes = divT;
		setTimeout(() => {
			classes = divT + ' ' + resolvedFadeout;
		}, animationLength);
	});

	$: if (status !== 'RESOLVED') {
		classes = resolvedFadeout + ' ' + divT2;
	}
	$: if (data) {
		calculatedPoints = data.outcomes.reduce((acc: any, current: any) => {
			acc = current.channel_points + acc;
			return acc;
		}, 0);
		amountOfPointsWinned = data.outcomes
			.filter((element) => element.id !== data.winning_outcome_id)
			.reduce((acc, curr) => acc + curr.channel_points, 0);
		winner = data.winning_outcome_id;
	}
</script>

<div class={classes || initialOpacity} style="width: {barWidth}px">
	<h2 class={title}>{data.title}</h2>
	<p class={time}>{amountOfPointsWinned} points goes to the winners</p>
	<div class={mainDiv}>
		{#if data}
			{#each data.outcomes as pred}
				<div class={pred.id === winner ? '' : lose}>
					<div>
						<div class={divTitle}>
							<span>{pred.title}</span>
						</div>
						<div class={divPoints}>
							<span>{pred.channel_points}</span>
							<img class={pointsIcon} src={image} alt="o" />
						</div>
					</div>
					<Bar color={pred.color} points={pred.channel_points} biggerPoints={+calculatedPoints} />
				</div>
			{/each}
		{/if}
	</div>
</div>
