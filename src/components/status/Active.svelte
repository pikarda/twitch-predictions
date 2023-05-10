<script lang="ts">
	import { onMount } from 'svelte';
	import { divTitle, divPoints, pointsIcon, mainDiv } from '../Outcome.styles';
	import Bar from '../UI/Bar.svelte';
	import image from '../../assets/svgexport-6.svg';
	import type { FetchData } from '../../helpers/interfaces';
	import { divT, divT2, initialOpacity, time, title } from './Status.styles';
	import { barWidth } from '../../helpers/config';

	onMount(() => {
		classes = divT;
	});

	let classes: string = '';
	let remainingTime: string;
	export let status: string;
	export let data: FetchData;

	let calculatedPoints: string;
	$: if (status !== 'ACTIVE') {
		classes = divT2;
	}
	$: if (data) {
		calculatedPoints = data.outcomes.reduce((acc: any, current: any) => {
			acc = current.channel_points + acc;
			return acc;
		}, 0);

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
	}
</script>

<div class={classes || initialOpacity} style="width: {barWidth}px">
	{#if data}
		<h2 class={title}>{data.title}</h2>
		<p class={time}>{remainingTime}</p>
		<div class={mainDiv}>
			{#each data.outcomes as pred}
				<div>
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
