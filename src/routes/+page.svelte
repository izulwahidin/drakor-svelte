<script>
    import Hero from "$lib/hero.svelte"
    import Seo from "$lib/seo.svelte";
    import SliderWithTitle from "$lib/slider-with-title.svelte";
	import { page } from '$app/stores';    
    import { onMount } from "svelte";

    
    import ShimmerHero from "$lib/shimmer/hero.svelte";
    import ShimmerTitleBox from "$lib/shimmer/titleBox.svelte";
    import ShimmerCard from "$lib/shimmer/card.svelte";

    async function fetchData(endpoint) {
        const resp = await fetch(`${$page.url.href}${endpoint}/1/api`);
        const res = await resp.json()

        return {
            cards: res.cards.data,
            pagination: res.pagination.data,
        }
    }


    let popular, movie, latest, dub
    onMount( async () => {
        popular = await fetchData('popular');
        movie = await fetchData('movie');
        latest = await fetchData('sub');
        dub = await fetchData('dub');
    }) 
</script>

<Seo
    is_page={true}
    is_home={true}
    img={popular ? popular.cards[0].image.url : 'https://i0.wp.com/images5.fanpop.com/image/photos/31400000/Taiga-Aisaka-tsundere-girls-31408075-2560-1600.png'}
/>

{#if popular}
    <Hero data={popular.cards}/>
{:else}
    <ShimmerHero/>
{/if}


{#if latest}
    <SliderWithTitle sliderTitle='Sub' sliderData={latest.cards}/>
{:else}
    <ShimmerTitleBox/>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {#each Array.from(Array(12).keys()) as _}
            <div class="relative">
                <ShimmerCard/>
            </div>
        {/each}
    </div>
{/if}


{#if movie}
    <SliderWithTitle sliderTitle='Movie' sliderData={movie.cards}/>
{/if}


{#if dub}
    <SliderWithTitle sliderTitle='Dub' sliderData={dub.cards}/>
{/if}