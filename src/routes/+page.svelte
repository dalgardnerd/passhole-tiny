<script lang="ts">

  import { onMount } from "svelte";
  import { createPassphrase } from "$lib/utils/createPassphrase";

  let passphrase: string = "";
  let count = 0;
  let words: string[] = [];

  onMount(async () => {
		const response = await fetch('basic.txt');
		const text = await response.text();
		words = text.split('\n');
		passphrase = createPassphrase(5,12,3,2,'-',words)
	});

  function handleGet() {
    passphrase = createPassphrase(5,12,3,2,'-',words);
  }


	async function copyClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard:', text);
		} catch (err) {
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
				class="btn-sm rounded btn-secondary lowercase"
				on:click={handleGet}>Create Passphrase</button
			>
				<button
					class="btn-sm rounded btn-accent lowercase"
					on:click={() => copyClipboard(passphrase)}>Copy Passphrase</button
				>

      </div>
    </div>
  </div>