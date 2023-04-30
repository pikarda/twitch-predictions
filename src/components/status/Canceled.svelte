<script lang="ts">
	import { onMount } from 'svelte';
	import { lose, divTitle, divPoints, pointsIcon, mainDiv } from '../Outcome.styles';
	import type { FetchData } from '../../helpers/interfaces';
	import image from '../../assets/svgexport-6.svg';
	import Bar from '../UI/Bar.svelte';
	import { divT, divT2, initialOpacity, time, title, resolvedFadeout } from './Status.styles';
	import { barWidth, animationLength } from '../../helpers/config';

	let classes: string = '';
	let calculatedPoints: string;
	export let status: string = 'CANCELED';
	export let data: FetchData;

	onMount(() => {
		classes = divT;
		setTimeout(() => {
			classes = divT + ' ' + resolvedFadeout;
		}, animationLength);
	});

	$: if (status !== 'CANCELED') {
		classes = resolvedFadeout + ' ' + divT2;
	}
	$: if (data) {
		calculatedPoints = data.outcomes.reduce((acc: any, current: any) => {
			acc = current.channel_points + acc;
			return acc;
		}, 0);
	}
</script>

<div class="{classes || initialOpacity} " style="width: {barWidth}px">
	{#if data}
		<h2 class={title}>{data.title}</h2>
		<p class={time}>Submissions Canceled</p>
		<div class={mainDiv}>
			{#each data.outcomes as pred}
				<div class={lose}>
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
		</div>
	{/if}
</div>
