<script lang="ts">

	import { onMount } from "svelte";
	import { createPassphrase } from "$lib/utils/createPassphrase";

	let passphrase: string = "";
	let wordList: string[] = [];


	const minChars = 5;
	const maxChars = 12;
	const wordCount = 3;
	const randomDigits = 2;
	const wordSeparator = '-';

	
	const notCopiedText = "copy passphrase"
	const copiedText = "copied!"
	let copyButton = notCopiedText;
	let copyTimeout: any;

	onMount(async () => {
		const response = await fetch('basic.txt');
		const text = await response.text();
		wordList = text.split('\n');
		passphrase = createPassphrase(minChars, maxChars, wordCount, randomDigits, wordSeparator, wordList);
	});

	function handleGet() {
		passphrase = createPassphrase(minChars,maxChars,wordCount,randomDigits,wordSeparator,wordList);
	}

	function handleCopy() {
		clearTimeout(copyTimeout);
		copyClipboard(passphrase);
		copyButton = copiedText;
		copyTimeout = setTimeout(() => {
    		copyButton = notCopiedText;
		}, 2000); 
	}


	async function copyClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard:', text);
		} 
		catch (err) {
			console.error('Failed to write to clipboard:', err);
		}
	}



</script>

  <div class="card w-96 bg-neutral text-primary-content border-2 border-white rounded-none">
    <div class="card-body">
      <h2 class="text-2xl text-center bold p-0 m-0">tiny passhole</h2>
      <p class="flex justify-center text-center align-center text-md bg-red m-2">{passphrase}</p>
      <div class="card-actions justify-center">
        <button
			class="btn-sm rounded btn-primary lowercase"
			on:click={handleGet}>Create Passphrase</button
		>
		<button
			class="btn-sm rounded btn-accent lowercase w-32"
			on:click={handleCopy}>{copyButton}</button
		>

      </div>
    </div>
  </div>