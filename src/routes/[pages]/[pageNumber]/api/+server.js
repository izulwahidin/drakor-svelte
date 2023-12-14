import {BASE_API} from '$env/static/private';

export async function GET({params, pages, pageNumber}) {
    try {
        const resp = await fetch(`${BASE_API}/${params.pages}/${params.pageNumber}`);
        const data = await resp.json();
    
        const headers = {
            'Cache-Control': 'max-age=6000, s-maxage=6000',
            'Content-Type': 'application/json',
        };
        return new Response(JSON.stringify(data), {
            headers
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            status: 500,
            body: 'Internal Server Error',
        };
    }
}