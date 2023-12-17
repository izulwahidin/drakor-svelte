<script>
    import Card from '$lib/card.svelte';
    import TitleBox from '$lib/titleBox.svelte';
    import Seo from '$lib/seo.svelte';


    let data, res, inputValue, minInput, notFound = null;
    const fetchData = async (q) => {
        res = await fetch(`/search/api?q=${q}`).then(r=>r.json())
        data = res
        if(!res.cards){
            notFound = true
            data = null
        } else{
            data = res
        }
    };


    const handleChange = () => {
        minInput = inputValue.length >= 4 ? true : false;
        if (minInput) {
            fetchData(inputValue);
            // Reset notFound to null when fetching new data.
            notFound = null;
        } else {
            data = null;
        }
    };



    
</script>

<div class="px-2">
    <TitleBox title="Search Anime" is_center={true}/>
    <input type="text" class="w-full p-2 my-2 rounded text-black text-center" placeholder="Naruto..." bind:value={inputValue} on:keyup={handleChange}>
    {#if notFound}
        <Seo is_search={true} title="Search for {inputValue}"/>
        <p class="text-center">We dont have post for <span class="font-bold">{inputValue}</span></p>
    {:else if data}
        <Seo is_search={true} title="Search for {inputValue}"/>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
    {:else if !minInput}
        <Seo title="Search Anime"/>
        <p class="text-center">Type at least 4 characters to search an Anime</p>
    {:else}
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <Seo title="Please Wait..."/>
        <p class="text-center">searching...</p>
    </div>
    {/if}
</div>