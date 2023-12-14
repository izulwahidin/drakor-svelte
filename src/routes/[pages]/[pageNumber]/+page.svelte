<script>
    import Card from '$lib/card.svelte';
    import TitleBox from '$lib/titleBox.svelte';
    import Pagination from '$lib/pagination.svelte';
    import Seo from '$lib/seo.svelte';
    import { error } from '@sveltejs/kit';
	import { page } from '$app/stores';    
    import { onMount } from 'svelte';

    import ShimmerCard from '$lib/shimmer/card.svelte'
    import ShimmerTitleBox from '$lib/shimmer/titleBox.svelte'

    $: {
        switch ($page.params.pages) {
            case 'sub':
                break;
            case 'raw':
                break;
            case 'dub':
                break;
            case 'movie':
                break;
            case 'season':
                break;
            case 'popular':
                break;
            case 'ongoing':
                break;
            default:
                throw error(404, 'Not found');
        }
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    let data
    
    onMount( async () => {
        const resp = await fetch(`${$page.url.href}/api`);
        const res = await resp.json();
        data = {
            cards: res.cards.data,
            pagination: res.pagination.data,
        }
    })
    

</script>


<div class="px-2">
    {#if data}
        <Seo is_page={true} title={capitalizeFirstLetter($page.params.pages)} img={data.cards[0].image.url}/>

        <TitleBox title="Latest {capitalizeFirstLetter($page.params.pages)} Anime" is_center={true}/>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {#each data.cards as card}
                <div class="relative">
                    <Card
                        cardEpisode={card.episode}
                        cardImage={card.image.url}
                        cardTitle={card.title}
                        cardUpdate={card.update_at}
                        cardUrl={card.url}
                    />
                </div>
            {/each}
        </div>
        <Pagination path={$page.params.pages} data={data.pagination} a={onMount}/>
    {:else}
        <Seo title="Please Wait..."/>
        <ShimmerTitleBox/>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {#each Array.from(Array(12).keys()) as _}
                <div class="relative">
                    <ShimmerCard/>
                </div>
            {/each}
        </div>
    {/if}
</div>