<script lang="ts">

  function createPassphrase () {
    return "passphrase"
  }

  

	let passphrase: string = createPassphrase();
  let count = 0;

  function handleGet() {
    count++;
    passphrase = "eyyo" + count;
  }

	export async function copyClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard:', text);
		} catch (err) {
			console.error('Failed to write to clipboard:', err);
		}
	}

</script>






  <div class="card w-96 bg-neutral text-primary-content m-2 border-white border-4">
    <div class="card-body">
      <h2 class="text-xl text-center bold p-0 m-0">tiny passhole</h2>
      <p class="text-center break-words m-4">{passphrase}</p>
      <div class="card-actions justify-center">
        <button
				class="btn-sm rounded btn-primary lowercase"
				on:click={handleGet}>Create Passphrase</button
			>
				<button
					class="btn-sm rounded btn-secondary lowercase"
					on:click={() => copyClipboard(passphrase)}>Copy Passphrase</button
				>

      </div>
    </div>
  </div>