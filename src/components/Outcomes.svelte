<script lang="ts">
	import { barWidth } from '../helpers/config';
	import { css } from '@emotion/css';
	import { onMount } from 'svelte';
	import predictionsData from '../store/prediction-store';
	import Bar from './UI/Bar.svelte';
	import image from '../assets/svgexport-6.svg';
	import type { FetchData } from '../helpers/interfaces';
	import {
		lose,
		divTitle,
		divPoints,
		pointsIcon,
		lockedDiv,
		divForCircles,
		mainDiv
	} from './Outcome.styles';
	import Circle from './UI/Circle.svelte';

	export let winner = '';
	export let status: string;

	onMount(() => {
		const unsubscribe = predictionsData.subscribe((d) => (data = d));
		return () => {
			unsubscribe();
		};
	});
	let data: FetchData;
	let calculatedPoints: string;
	$: if (data) {
		calculatedPoints = data.outcomes.reduce((acc: any, current: any) => {
			acc = current.channel_points + acc;
			return acc;
		}, 0);
	}
</script>

{#if data}
	{#if status === 'ACTIVE'}
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

	{#if status === 'LOCKED'}
		<div
			class="{lockedDiv} {css`
				opacity: 40%;
			`}	"
		>
			{#each data.outcomes as pred, i}
				<div
					class="{divForCircles} {css`
						width: ${barWidth / data.outcomes.length}px;
						height: ${barWidth / data.outcomes.length}px;
					`}"
				>
					<Circle
						divSize={barWidth / data.outcomes.length}
						outcomeNumber={i + 1}
						color={pred.color}
						points={pred.channel_points}
						biggerPoints={+calculatedPoints}
					/>
				</div>
			{/each}
		</div>
	{/if}

	{#if status === 'RESOLVED'}
		<div class={mainDiv}>
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
		</div>
	{/if}

	{#if status === 'CANCELED'}
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
{/if}
