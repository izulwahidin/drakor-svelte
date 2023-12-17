<script>
    import Lazy from 'svelte-lazy';
    import op_img from '$lib/func.js'
    export let cardTitle, cardUpdate, cardImage, cardEpisode, cardUrl
</script>
<a href={cardUrl} data-sveltekit-reload>
    <div class="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-primary to-transparent"></div>
    <p class="absolute top-4 right-1 bg-accent py-1 px-2 rounded text-xs">E{cardEpisode}</p>
    <p class="absolute top-4 left-1 bg-secondary py-1 px-2 rounded truncate max-w-[60%] text-xs">{cardUpdate}</p>
    <Lazy height={360}>
        <img src={op_img(cardImage)} alt="Image {cardTitle}" class="w-full max-h-[360px] object-cover rounded"/>
    </Lazy>
    <div class="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-primary to-transparent"></div>
    <button class="absolute px-2 w-full max-w-[90%] bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  py-2 rounded-2xl transition duration-300 hover:bg-gray-800 hover:border-none text-sm hover: truncate">{cardTitle}</button>
</a>