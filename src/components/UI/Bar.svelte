<script lang="ts">
	import { css } from '@emotion/css';
	import { barMask, divSpan, innerBar, mainBar } from './Bar.styles';

	export let color: string;
	export let points: number;
	export let biggerPoints: number;

	let percents = '';
	let width: number;
	let barColor: string;

	if (biggerPoints === 0) {
		width = 3;
	}
	if (points === 0 && biggerPoints > 0) {
		width = 3;
	}
	if (points > 0 && biggerPoints > 0) {
		width = (points / biggerPoints) * 100;
	}

	if (color === 'PINK') {
		barColor = '#f5009b';
	}
	if (color === 'BLUE') {
		barColor = '#387aff';
	}

	if (points === 0) {
		percents = '0%';
	}
	if (points > 0) {
		percents = ((points / biggerPoints) * 100).toFixed(0) + '%';
	}
</script>

<div class={mainBar}>
	<div class={barMask}>
		<div
			class="{innerBar} {css`
				width: ${width}%;
				background-color: ${barColor};
			`}"
		/>
	</div>
</div>
<div class={divSpan}>
	<span>{percents}</span>
</div>
