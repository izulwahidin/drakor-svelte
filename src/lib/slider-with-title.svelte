<script>
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import TitleBox from './titleBox.svelte';
    import Card from './card.svelte';

    export let sliderTitle, sliderData, padding;

    let options = {
    type: 'loop',
    perPage: 4,
    breakpoints: {
        425: {
            perPage: 2,
        },
        768: {
            perPage: 3,
        },
    },
    pagination: true,
    gap: '0.5rem',
    lazyLoad: true,
    cover: true,
};

</script>

<div class='{padding??'px-2'}'>
    <TitleBox title={sliderTitle}/>
    <Splide options={options} aria-label="Hero">
        {#each sliderData as card}
            <SplideSlide>
                <Card
                    cardEpisode={card.episode}
                    cardImage={card.image}
                    cardTitle={card.full_title}
                    cardUpdate={card.update_at}
                    cardUrl={card.url}
                />
            </SplideSlide>
        {/each}
    </Splide>
</div>