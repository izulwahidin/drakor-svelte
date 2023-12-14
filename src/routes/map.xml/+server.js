import { DOMAIN} from '$env/static/private';

export const GET = async ({url}) => {
  let content
  const q = url.searchParams.get('q')

  if(!q){
    return new Response('Query not found')
  }

  const headers = {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/xml',
  };
  try {
        const resp = await fetch(`https://whd.my.id/kissanime-map/?q=${q}`);
        const data = await resp.json();

        
        content = data.map(e => `<url><loc>${DOMAIN}/watch/${e.trim()}</loc></url>`).join('');
        content = `<?xml version='1.0' encoding='UTF-8'?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${content}</urlset>`
        return new Response(content, {headers})
    } catch (error) {
      console.log(error)
        return {
            status: 500,
            body: 'Internal Server Error',
        };
    }
}
