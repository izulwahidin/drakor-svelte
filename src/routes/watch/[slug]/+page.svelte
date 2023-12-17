<script>
    
    import TitleBox from '$lib/titleBox.svelte';
    import Stream from '$lib/player.svelte';
    import Lazy from 'svelte-lazy';
    import op_img from '$lib/func.js'
    import Seo from '$lib/seo.svelte';
    import {parseTimestamps, getCurrentUpdateAt} from '$lib/func.js'
	import { page } from '$app/stores';    
    export let data 

    // SEO Things
    const uploadDate = parseTimestamps(getCurrentUpdateAt(data.data.episodes,$page.url.pathname))
    let pageTitle = `Watch ${data.data.full_title}`;

</script>


<div class="px-2">
    <Seo title={pageTitle} img={data.data.image} uploadDate={uploadDate}/>
    <TitleBox title={pageTitle} is_center={true}/>
    <div class="aspect-video my-2">
        {#if !data.data.video.hls.source[0].file}
            <iframe src={data.data.video.default_embed} title={pageTitle}  frameborder="0"></iframe>
        {:else}
            <Stream url_hls={data.data.video.hls.source[0].file}/>
        {/if}
    </div>

    <TitleBox title="Info" is_center={true}/>
    <div class="text-center flex gap-2 py-2">
        <Lazy height={360}>
            <img src={op_img(data.data.image)} alt="{pageTitle}" class="w-full max-h-[360px] object-cover rounded" >
        </Lazy>
        <p class="w-[80%]">{data.data.description}</p>
    </div>
    
    <TitleBox title="Episode List" is_center={true}/>
    <div class="episode">
        {#each data.data.episodes as eps}
            <a data-sveltekit-reload href={eps.url} class="hover:text-green-500 hover:font-bold hover:text-md">
                <div class="flex gap-2 py-1 justify-between border-b-2">
                    <p class="truncate">{eps.full_title}</p>
                    <div class="flex gap-2">
                        <span class="bg-secondary py-1 px-2 rounded text-xs truncate">{eps.update_at.includes('ago') ? eps.update_at : parseTimestamps(eps.update_at)}</span>
                        <span class="bg-accent py-1 px-2 rounded text-xs !text-white">E{eps.episode}</span>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>


<style>
    iframe{
        width: 100%;
        height: 100%;
    }
</style>