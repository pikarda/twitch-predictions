<script>
	import Footer from './Footer.svelte';
	import { clientId } from '../helpers/config';
	import { ingectGlobalStyle } from './Guide.styles';

	ingectGlobalStyle();
</script>

<div>
	<h2>Connect with Twitch</h2>
	<!-- Change redirect URL down here -->
	<a
		href={'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=' +
			clientId +
			'&redirect_uri=http://localhost:5173/predictions&scope=channel%3Aread%3Apredictions&state=c3ab8aa609ea11e793ae92361f002671'}
	>
		Connect with Twitch
	</a>

	<h3>To make it work</h3>
	<p>You must have <span>"affiliate"</span> or <span>"partner"</span> status on Twitch</p>
	<p>You must have the "predictions" feature <span>enabled</span></p>
	<p>You must have used the "predictions" feature <span>at least once</span></p>
	<br />
	<p>After authorization, you will be redirected to a <span>new page</span></p>
	<p><span>Copy the URL</span> of this page from the address bar of your browser</p>
	<p>
		Open OBS Studio and create a new <span>"Browser"</span> source, paste the copied URL into the URL
		field
	</p>
</div>

<Footer />
