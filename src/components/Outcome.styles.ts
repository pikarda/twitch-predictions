import { css } from '@emotion/css';
import { barWidth, barHeigh } from '../helpers/config';

import githubLogo from '../assets/github.svg';
import discordLogo from '../assets/discord.svg';

export const divTitle = css`
	padding-left: 5px;
	display: flex;
	float: left;
	width: 80%;
	height: 100%;
	justify-content: left;

	& > span {
		padding-bottom: 5px;
		text-justify: auto;
		font-family: Shantell-Sans-Italic;
		color: rgb(214, 214, 214);
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
		font-size: ${(barHeigh / 4) * 2.2}px;
	}
`;

export const divPoints = css`
	display: flex;
	float: left;
	width: 20%;
	height: auto;
	align-items: center;
	justify-content: center;

	& > span {
		font-size: ${(barHeigh / 4) * 2.4}px;
		padding-bottom: 5px;
		font-family: Shantell-Sans-Italic;
		color: rgb(214, 214, 214);
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}
`;

export const pointsIcon = css`
	padding-left: 5px;
	padding-bottom: 5px;
`;

export const lose = css`
	opacity: 40%;
	margin-bottom: ${barHeigh / 4 + barHeigh}px;

	& > div:nth-of-type(1) {
		width: ${(barWidth / 100) * 90}px;
		display: flex;
	}
`;

export const divForCircles = css`
	display: flex;
	justify-content: center;
	align-items: center;

	opacity: '50%';
	min-width: 100px;
	min-height: 100px;
`;

export const lockedDiv = css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	width: ${barWidth}px;
`;

export const mainDiv = css`
	width: ${barWidth}px;

	& > div {
		margin-bottom: ${barHeigh / 4 + barHeigh}px;
	}

	& > div > div:nth-of-type(1) {
		width: ${(barWidth / 100) * 90}px;
		display: flex;
	}
`;

export const footer = css`
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 2vh;
	width: 100%;
	height: 50px;

	& > div {
		background-size: 100%;
		display: block;
		float: left;
		width: 50px;
		height: 50px;
	}

	& > div:nth-child(1) {
		background-image: url(${discordLogo});
	}
	& > div:nth-child(2) {
		background-image: url(${githubLogo});
	}
	& > div > a {
		display: block;
		height: 100%;
		width: auto;
	}
`;
