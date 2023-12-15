import * as cheerio from 'cheerio';
import CryptoJS  from "crypto-js";
import { fetchText, fetchJson } from '$lib/func';
import { PUBLIC_TARGET } from '$env/static/public';

let $

const data = {
    'key': '93422192433952489752342908585752',
    'iv': '9262859232435825'
}

export async function GET({params}){
    try {
        const raw = await fetchText(`${PUBLIC_TARGET}/videos/${params.slug}`)
        $ = cheerio.load(raw)
        
        const left_content = $('.video-info-left')
        const right_content = $('.video-info-right')

        const embed = 'https:'+$(left_content).find('iframe').attr('src')
        const image = $('meta[itemprop="image"]').attr('content').replace('//','//i0.wp.com/')
        const episode = $(left_content).find('h1').text().trim().match(/Episode (.*?)\s/)[1]

        const res = {
            status: true,
            data: {
                full_title: $(left_content).find('h1').text(),
                title: $(left_content).find('.video-details .date').text().trim(),
                episode,
                description: $(left_content).find('.content-more-js').text().trim(),
                image,
                video: await getVideo(embed),
                episodes: parseItems($(left_content).find('.video-block')),
                latest: parseItems($(right_content).find('.video-block'))
            }
        }
        return new Response(JSON.stringify(res))
    } catch (error) {
        const err = {
            status: false,
            message: error
        }
        
        return new Response(JSON.stringify(err), {
            status: 500
        })
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

async function getVideo(url){
    const raw = await fetchText(url)
    const v = cheerio.load(raw);

    let embeds = []
    v('li[data-status="1"]').each((_,e) => {
        let provider = v(e).attr('data-provider')
        let embed_url = v(e).attr('data-video')

        embeds.push({
            provider,
            embed_url
        })
    })

    const value = v('script[data-name="crypto"]').attr('data-value')
    const id = v('input[id="id"]').attr('value')
    const hls = await decryptVideo(id,value)

    const res = {
        'default_embed': url,
        embeds,
        hls
    }

    return res
}


async function decryptVideo(id,value){
    const decrypt = CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(data.key), {
        'iv': CryptoJS.enc.Utf8.parse(data.iv)
    });
    
    const parseDecrypt = CryptoJS.enc.Utf8.stringify(decrypt);

    const ajaxQuery = PUBLIC_TARGET+"/encrypt-ajax.php?id=" + CryptoJS.AES.encrypt(id, CryptoJS.enc.Utf8.parse(data.key), {
        'iv': CryptoJS.enc.Utf8.parse(data.iv)
    }).toString() + parseDecrypt.substr(parseDecrypt.indexOf('&')) + "&alias=" + id

    const lmao = await fetchJson(ajaxQuery);
    
    const res = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(lmao.data, CryptoJS.enc.Utf8.parse(data.key), {
        'iv': CryptoJS.enc.Utf8.parse(data.iv)
    })));

    return res
}