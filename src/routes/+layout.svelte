<script>
	import { injectGlobal } from '@emotion/css';
	import regular from '../assets/ShantellSans-Regular.ttf';
	import bold from '../assets/ShantellSans-Bold.ttf';
	import italic from '../assets/ShantellSans-Italic.ttf';

	injectGlobal`
	 	#root {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}

	@font-face {
		font-family: Shantell-Sans-Italic;
		src: url(${italic});
	}
	@font-face {
		font-family: Shantell-Sans-Bold;
		src: url(${bold});
	}
	@font-face {
		font-family: Shantell-Sans;
		src: url(${regular});
	}
	body {
		margin: 0;
		display: flex;
		justify-content: center;
		min-width: 320px;
		/* min-height: 50vh; */
	}
	
	 `;
</script>

<slot />

<style>
</style>
