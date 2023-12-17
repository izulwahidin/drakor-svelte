<script>
  import Hero from "$lib/hero.svelte"
  import { onMount } from "svelte";
	import { page } from '$app/stores';  
  import Seo from '$lib/seo.svelte'  

  import ShimmerHero from '$lib/shimmer/hero.svelte'

  let popular
  onMount( async () => {
        const resp = await fetch(`${$page.url.origin}/popular/1/api`).then(r => r.json())
        popular = resp.cards
  })
  
</script>

<Seo title="Menu"/>
{#if popular}
  <Hero cards={popular}/>
{:else}
  <ShimmerHero/>
{/if}
<div class="px-2">
  <ul class="page-menu grid grid-cols-2 gap-2">
    <a href="/sub/1" data-sveltekit-reload><li>Sub</li></a>
    <a href="/raw/1" data-sveltekit-reload><li>Raw</li></a>
    <a href="/movie/1" data-sveltekit-reload><li>Movie</li></a>
    <a href="/kshow/1" data-sveltekit-reload><li>KShow</li></a>
    <a href="/popular/1" data-sveltekit-reload><li>Popular</li></a>
    <a href="/ongoing/1" data-sveltekit-reload><li>Ongoing</li></a>
  </ul>
</div>