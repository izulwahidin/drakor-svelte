<script>
    
    import TitleBox from '$lib/titleBox.svelte';
    import md5 from 'md5';
    import Stream from '$lib/player.svelte';
    import Lazy from 'svelte-lazy';
    import op_img from '$lib/func.js'
    import Seo from '$lib/seo.svelte';
    import {parseTimestamps, getUpdateAtByUrl, isSlugMatched} from '$lib/func.js'
	import { page } from '$app/stores';    
    import {db, collection, query, where, getDocs, auth, onAuthStateChanged, setDoc, doc, deleteDoc } from '$lib/firebase.js'
    export let data 

    // let user, watched, is_watched, loading_button_watch;

    // onAuthStateChanged(auth, async (currentUser) => {
    //     user = currentUser;
    //     if(user){    
    //         watched = await getWatchedEpisodes().then(e => { return e })
    //         is_watched = isSlugMatched(watched, $page.params.slug)
    //         return
    //     }
    //     watched = []
    //     is_watched = []
    // });


    // const getWatchedEpisodes = async () => {
    //     if(!auth.currentUser){
    //         console.log('login to wiew your watched episode')
    //         return null;
    //     }

    //     let res = []

    //     const slugPrefix = $page.params.slug.slice(0, -4);
    //     const q = query(
    //         collection(db, "is_watched"), 
    //         where("uid", "==", auth.currentUser.uid), 
    //         where("slug", ">=", slugPrefix),
    //         where("slug", "<", slugPrefix + String.fromCharCode(slugPrefix.charCodeAt(slugPrefix.length - 1) + 1))
    //     );
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         res.push(doc.data())
    //     });

    //     // console.log(JSON.stringify(res))
    //     // console.log(res)
    //     return res
    // }

    // // Handling Things
    // const handleWatched = async () => {
    //     try {
    //         if(!is_watched){
    //             loading_button_watch = true
    //             await setDoc(doc(db, 'is_watched', md5(auth.currentUser.uid+$page.params.slug)), { uid: auth.currentUser.uid, slug: $page.params.slug });
    //             console.log('added to watched list')
    //         }else{
    //             loading_button_watch = true
    //             await deleteDoc(doc(db, "is_watched", md5(auth.currentUser.uid+$page.params.slug)));
    //             console.log('removed from watched list')
    //         }
    //     } catch (error) {
    //         console.log('handleWatched',error)
    //     }
    //     loading_button_watch = null
    //     is_watched = !is_watched;
    // }

    // // SEO Things
    // const uploadDate = parseTimestamps(getUpdateAtByUrl(data.info.cards.data.episode,'/videos/'+$page.params.slug))
    let pageTitle = `Watch ${data.data.full_title}`;
</script>


<div class="px-2">
    <!-- <Seo title={pageTitle} img={op_img(data.info.cards.data.episode[0].image.alt_url)} uploadDate={uploadDate??''} /> -->
    <TitleBox title={pageTitle} is_center={true}/>
    <div class="aspect-video my-2">
        {#if !data.data.video.hls.source.file}
            <iframe src={data.data.video.iframe} title={pageTitle}  frameborder="0"></iframe>
        {:else}
            <Stream url_hls={data.data.video.hls.source.file}/>
        {/if}
    </div>

    <TitleBox title="Info" is_center={true}/>
    <div class="text-center flex gap-2 py-2">
        <Lazy height={360}>
            <img src={data.data.image} alt="{pageTitle}" class="w-full max-h-[360px] object-cover rounded" >
        </Lazy>
        <p class="w-[80%]">{data.data.description}</p>
    </div>
    <!-- {#if user && watched}
        <div class="flex justify-center">
            {#if loading_button_watch}
                <p>Please Wait....</p>
            {:else}
                {#if is_watched}
                    <button class="animate-pulse text-red-500 font-bold flex gap-1 items-center    border-2 rounded px-3 mb-2" on:click={handleWatched}>You have marked this Episode as Watched</button>
                {:else}
                    <button class="animate-pulse text-yellow-500 font-bold flex gap-1 items-center border-2 rounded px-3 mb-2" on:click={handleWatched}>Click here if you have watched this Episode</button>
                {/if}
            {/if}
        </div>
    {/if} -->
    
    <TitleBox title="Episode List" is_center={true}/>
    <div class="episode">
        {#each data.data.episodes as eps}
            <a data-sveltekit-reload href={eps.url} class="hover:text-green-500 hover:font-bold hover:text-md">
                <div class="flex gap-2 py-1 justify-between border-b-2">
                    <p class="truncate">{eps.full_title}</p>
                    <div class="flex gap-2">
                        <!-- {#if watched}
                            <span class="bg-green-500 py-1 px-2 rounded text-xs !text-white {isSlugMatched(watched, eps.url.split('/')[2]) ? '' : 'hidden'}">Watched</span>
                        {/if} -->
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