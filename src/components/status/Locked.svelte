<script lang="ts">
	import { css } from '@emotion/css';
	import { onMount } from 'svelte';
	import { lockedDiv, divForCircles } from '../Outcome.styles';
	import type { FetchData } from '../../helpers/interfaces';
	import Circle from '../UI/Circle.svelte';
	import { divT2, initialOpacity, time, title, lockedAnimation } from './Status.styles';
	import { barWidth } from '../../helpers/config';

	let classes: string = '';
	export let status: string = 'LOCKED';
	export let data: FetchData;
	let calculatedPoints: string;

	onMount(() => {
		classes = lockedAnimation;
	});

	$: if (status !== 'LOCKED') {
		classes = lockedAnimation + ' ' + divT2;
	}
	$: if (data) {
		calculatedPoints = data.outcomes.reduce((acc: any, current: any) => {
			acc = current.channel_points + acc;
			return acc;
		}, 0);
	}
</script>

<div class={classes || initialOpacity} style="width: {barWidth}px">
	<h2 class={title}>{data.title}</h2>
	<p class={time}>Submissions Closed</p>
	{#if data}
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
</div>
