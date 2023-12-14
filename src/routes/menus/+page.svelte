<script>
  import Hero from "$lib/hero.svelte"
  import { onMount } from "svelte";
	import { page } from '$app/stores';  
  import Seo from '$lib/seo.svelte'  

  import ShimmerHero from '$lib/shimmer/hero.svelte'

  let popular
  onMount( async () => {
        const resp = await fetch(`${$page.url.origin}/popular/1/api`);
        const res = await resp.json();
        popular = res.cards.data
  })
  
</script>

<Seo title="Menu"/>
{#if popular}
  <Hero data={popular}/>
{:else}
  <ShimmerHero/>
{/if}
<div class="px-2">
  <ul class="page-menu grid grid-cols-2 gap-2">
    <a href="/sub/1" data-sveltekit-reload><li>Sub</li></a>
    <a href="/raw/1" data-sveltekit-reload><li>Raw</li></a>
    <a href="/dub/1" data-sveltekit-reload><li>Dub</li></a>
    <a href="/movie/1" data-sveltekit-reload><li>Movie</li></a>
    <a href="/season/1" data-sveltekit-reload><li>Season</li></a>
    <a href="/popular/1" data-sveltekit-reload><li>Popular</li></a>
    <a href="/ongoing/1" data-sveltekit-reload><li>Ongoing</li></a>
    <a href="/search" data-sveltekit-reload><li>Search</li></a>
  </ul>
</div>