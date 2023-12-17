<script>
    import Card from '$lib/card.svelte';
    import TitleBox from '$lib/titleBox.svelte';
    import Pagination from '$lib/pagination.svelte';
    import Seo from '$lib/seo.svelte';
    import { capitalizeFirstLetter, fetchJson } from '$lib/func';
	import { page } from '$app/stores';    
    import { onMount } from 'svelte';

    import ShimmerCard from '$lib/shimmer/card.svelte'
    import ShimmerTitleBox from '$lib/shimmer/titleBox.svelte'

    const {pages, pageNumber} = $page.params

    let res

    const fetchData = async () => {
        try {
            res = await fetchJson(`${$page.url.origin}/${pages}/${pageNumber}/api`);
        } catch (err) {
            console.log(err);
        }
    };
    

    
    onMount(fetchData());
    
    const handlePagination = (() => {
        res = false;
        onMount(fetchData());
    })
    
</script>


<div class="px-2">
    {#if res}
        <Seo is_page={true} title={capitalizeFirstLetter(pages)} img={res.cards[0].image}/>
        <TitleBox title="Latest {capitalizeFirstLetter(pages)} Drama" is_center={true}/>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {#each res.cards as card}
                <div class="relative">
                    <Card
                        cardEpisode={card.episode}
                        cardImage={card.image}
                        cardTitle={card.full_title}
                        cardUpdate={card.update_at}
                        cardUrl={card.url}
                    />
                </div>
            {/each}
        </div>
        <Pagination data={res.pagination} handle={handlePagination}/>
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