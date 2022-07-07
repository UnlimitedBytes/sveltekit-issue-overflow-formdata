<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let warning = false;
	let disabled = false;
	let status = null;
	let blob = null;

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const escalate = async () => {
		disabled = true;

		if (!blob) {
			status = 'Generating big file in memory';

			// Give the browser a chance to rerender before hitting CPU
			await delay(0);

			let content = 'a';
			for (let i = 0; i < 28; i++) {
				content += content;
			}

			// we save the blob for later button presses
			// because generating it is very ram intensive
			blob = new Blob([content, content, content, content]);
		}

		status = 'Generating form data';
		const formData = new FormData();
		formData.set('file', blob, 'bigFile.txt');

		status = 'Sending request to server';
		await fetch('/', {
			method: 'POST',
			body: formData
		});

		status = 'Done.';
		disabled = false;

		setTimeout(() => {
			if (status === 'Done.') status = null;
		}, 5000);
	};

	onMount(() => {
		if (!Blob || !FormData) {
			warning = true;
		}
	});
</script>

{#if warning}
	<div class="alert">
		<h1>Your browser doesn't work!</h1>
		<p>Please use a newer browser which supports Blob and FormData creation!</p>
	</div>
{/if}
<h1>Welcome to SvelteKit Formdata Overflow</h1>
<p style="color:#ff704a;">
	<b>WARNING:</b> Clicking the button below will create a ~1GB big Blob in your Browsers RAM which will
	be send to the SvelteKit Server. The Blob generation can take up to ~3GB of RAM because of bad garbage
	collection!
</p>
<p>Press the button below while watching <b>node process</b> RAM usage!</p>
{#if status}
	<p>Status: {status}</p>
{/if}
<button on:click={escalate} {disabled}>RAM escalation</button>

<style>
	.alert {
		border-radius: 1rem;
		display: inline-block;
		background: #c0362e;
		padding: 0 1rem;
		margin: 1rem 0;
	}
</style>
