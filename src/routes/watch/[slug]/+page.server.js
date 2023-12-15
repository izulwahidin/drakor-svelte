import { error } from '@sveltejs/kit';
// import { BASE_API } from '$env/static/private';
import { cache, fetchJson } from '$lib/func.js'

export async function load({ url, params }) {
    let slug = params.slug;

    // Check if the data is in the cache
    const cachedData = cache.get(slug);
    
    if (cachedData) {
        console.log('from cache', slug)
        // return cachedData;
    }

    const resp = await fetchJson(`${url.origin}${url.pathname}/api`);
    cache.set(slug, resp);
    return resp

    throw error(404, 'Not found');
}
