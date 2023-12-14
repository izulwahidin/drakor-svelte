import { error } from '@sveltejs/kit';
import { BASE_API } from '$env/static/private';
import { cache } from '$lib/func.js'

export async function load({ params }) {
    let slug = params.slug;

    // Check if the data is in the cache
    const cachedData = cache.get(slug);
    
    if (cachedData) {
        console.log('from cache', slug)
        return cachedData;
    }

    const url = `${BASE_API}/watch/${slug}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const episode_slug = data.cards.data.episode.map(e => {
        return e.url.split('videos/')[1]
    })
    if (resp.ok) {
        const res = {
            info: data,
            ep_slugs: episode_slug
        };
        cache.set(slug, res);
        return res
    }

    throw error(404, 'Not found');
}
