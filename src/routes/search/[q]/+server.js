import { error } from '@sveltejs/kit';
import {BASE_API} from '$env/static/private';

export async function GET({params}) {
    let q = params.q
    
	const resp = await fetch(`${BASE_API}/search/${q}`);
    const data = await resp.json();

    if(data){
        const headers = {
            'Cache-Control': 'max-age=0, s-maxage=3600',
            'Content-Type': 'application/json',
        };
        return new Response(JSON.stringify(data), {headers})
    }

	throw error(404, 'Not found');
}