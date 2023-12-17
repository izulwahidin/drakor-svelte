<script>
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import Lazy from 'svelte-lazy';
    import '@splidejs/svelte-splide/css';
    import op_img from '$lib/func.js'
    
    export let cards;
    
    
    let options = {
        rewind: true,
        type: 'slide',
        autoplay: true,
        speed: 10,
        pagination: false,
        lazyLoad: true
    }
</script>
    
<Splide options={options} aria-label="Hero">
    {#each cards as card}
        <SplideSlide>
            <div class="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-primary to-transparent"></div>
            <Lazy class="max-h-[30vh] md:max-h-[40vh]">
                <img src={op_img(card.image)} alt="Image {card.full_title}" class="w-full max-h-[30vh] object-cover md:max-h-[40vh]"/>
            </Lazy>
            <div class="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-primary to-transparent"></div>
            <a href={card.url} data-sveltekit-reload class="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-5 py-2 rounded-2xl border border-white transition duration-300 hover:bg-gray-800 hover:border-none text-sm hover:">{card.full_title}</a>
        </SplideSlide>
    {/each}
</Splide>