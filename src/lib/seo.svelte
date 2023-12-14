<script>
    import { MetaTags, JsonLd } from 'svelte-meta-tags';
    import {PUBLIC_SITE_TITLE} from '$env/static/public'
    export let is_page, is_home, title, is_search, img, uploadDate

    let seoTitle,seoDesc,openGraph

    if(is_page){
        seoTitle = is_home? `${PUBLIC_SITE_TITLE} - Watch Anime Without Ads` : `${is_search? "" : "Latest Anime"} ${title} - ${PUBLIC_SITE_TITLE}`;
        seoDesc = (is_home ? "We provide complete anime list" : `Watch Latest Anime ${title}`) + ` with multiple quality [360p, 480p, 720p, 1080p] for FREE without ADS - ${PUBLIC_SITE_TITLE} | KissAnime | Zoro | 9Anime`
        openGraph={
            title: seoTitle,
            description: seoDesc,
            images: [
                { url: img}
            ],
            siteName: PUBLIC_SITE_TITLE
        }
    }else{
        seoTitle=`${title} - ${PUBLIC_SITE_TITLE}`
        seoDesc=`${title} with multiple quality [360p, 480p, 720p, 1080p] for FREE without ADS - ${PUBLIC_SITE_TITLE} | KissAnime | Zoro | 9Anime`
        openGraph={
            title: seoTitle,
            description: seoDesc,
            images: [
                { url: img}
            ],
            siteName: PUBLIC_SITE_TITLE,

        }
    }
</script>


<MetaTags
    title={seoTitle}
    description={seoDesc}
    openGraph={openGraph}
/>

{#if !is_page}
    <JsonLd
        schema={{
            '@type': 'VideoObject',
            name: seoTitle,
            thumbnailUrl: [img],
            description: seoDesc,
            uploadDate: uploadDate
        }}
    />
{/if}