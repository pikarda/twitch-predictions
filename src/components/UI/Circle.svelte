<script lang="ts">
	import { circle, index } from './Circle.styles';
	import { css } from '@emotion/css';

	export let points: number;
	export let biggerPoints: number;
	export let color: string;
	export let outcomeNumber: number;
	export let divSize: number;

	let width;

	if (biggerPoints === 0) {
		width = 3;
	}
	if (points === 0 && biggerPoints > 0) {
		width = 3;
	}
	if (points > 0 && biggerPoints > 0) {
		width = (points / biggerPoints) * 100;
	}

	let circleColor: string;

	if (color === 'PINK') {
		circleColor = '#f5009b';
	}
	if (color === 'BLUE') {
		circleColor = '#387aff';
	}

	let percents: string;

	if (points === 0) {
		percents = '0%';
	}
	if (points > 0) {
		percents = ((points / biggerPoints) * 100).toFixed() + '%';
	}
</script>

<div
	class="{circle} {css`
		background-color: ${circleColor};
	`}"
>
	<span
		class={css`
			font-size: ${divSize * 0.23}px;
		`}>{percents}</span
	>
</div>
<span
	class="{index} {css`
		font-size: ${divSize * 0.28}px;
	`}">{outcomeNumber}</span
>
