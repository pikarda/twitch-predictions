<script>
	import Footer from './Footer.svelte';
	import { clientId } from '../helpers/config';
	import { css } from '@emotion/css';

	const twitchButton = css`
		display: inline-block;
		appearance: button;
		text-decoration: none;
		outline: 0;
		border: none;
		cursor: pointer;
		line-height: 35px;
		text-align: center;
		font-weight: 600;
		border-radius: 4px;
		font-size: 13px;
		height: 35px;
		background-color: #9147ff;
		color: white;
		padding: 0 20px;
		:hover {
			background-color: #772ce8;
		}
	`;

	const divTest = css`
		display: block;
		height: 100%;
		width: 100%;
		padding-bottom: 50px;
		background-color: rgba(209, 196, 196, 0.774);
		border-radius: 50px;
	`;

	import { injectGlobal } from '@emotion/css';

	injectGlobal`
	
	  body {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
		min-width: 500px;
	  background-color: #4c3253;
	}
	p {
		font-family: Shantell-Sans-Italic;
		font-size: 22px;
	}
	`;
</script>

<div class={divTest}>
	<h2 style=" font-family: Shantell-Sans-Bold; font-size: 30px; padding-top: 30px ">
		Connect with Twitch
	</h2>
	<a
		class={twitchButton}
		href={'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=' +
			clientId +
			'&redirect_uri=http://localhost:5173/predictions&scope=channel%3Aread%3Apredictions&state=c3ab8aa609ea11e793ae92361f002671'}
	>
		Connect with Twitch
	</a>
</div>

<Footer />
