import {PUBLIC_TARGET} from '$env/static/public';
import { fetchText } from '$lib/func';
import * as cheerio from 'cheerio';

let $, globalpages

export async function GET({params}) {
    const {pages, pageNumber} = params
    globalpages = pages
    let endpoint
    try {
    
        switch (pages) {
            case 'sub':
                endpoint = ''
                break;
            case 'raw':
                endpoint = 'recently-added-raw'
                break;
            case 'movie':
                endpoint = 'movies'
                break;
            case 'kshow':
                endpoint = 'kshow'
                break;
            case 'popular':
                endpoint = 'popular'
                break;
            case 'ongoing':
                endpoint = 'ongoing-series'
                break;
            default:
                throw 'invalid endpoint'
        }

        console.log('woi',`${PUBLIC_TARGET}/${endpoint}?page=${pageNumber}`)
        const raw = await fetchText(`${PUBLIC_TARGET}/${endpoint}?page=${pageNumber}`);
        $ = cheerio.load(raw);

        
        const cards = parseItems($('.video-block'))
        const pagination = parsePagination($('.pagination li'))

        const res = {
            pagination,
            cards,
        }
    
        const headers = {
            'Cache-Control': 'max-age=6000, s-maxage=6000',
            'Content-Type': 'application/json',
        };
        return new Response(JSON.stringify(res), {
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

function parseItems(items){
    let res = []
    $(items).each((_,e) => {
        const episode = $(e).find('.name').text().trim().match(/Episode (.*?)(:?$|\s)/)[1]
        res.push({
            full_title: $(e).find('.name').text().trim(),
            episode,
            url: $(e).find('a').attr('href').replace('videos','watch'),
            type: $(e).find('.type span').text(),
            image: $(e).find('.picture img').attr('src'),
            alt_image: $(e).find('.picture img').attr('onerror'),
            update_at: $(e).find('.date').text(),

        })
    })
    return res;
}


function parsePagination(items){
    let res = []
    $(items).each((_,e) => {

        const is_next = $(e).attr('class') == 'next' ? true : false
        const is_prev = $(e).attr('class') == 'previous' ? true : false
        const isNextPrev = is_next ? 'next' : is_prev ? 'previous' : false
        const is_active = $(e).attr('class') == 'active' ? true : false
        // console.log($(e).find('a').attr('data-page'))
        res.push({
            isNextPrev,
            is_active,
            page: $(e).find('a').attr('data-page'),
            url: `/${globalpages}/`+$(e).find('a').attr('data-page')
        })
    })
    return res;
}
