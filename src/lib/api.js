import * as cheerio from 'cheerio';
const CryptoJS = require("crypto-js");
import { fetchText } from '$/func';

const data = {
    'key': '93422192433952489752342908585752',
    'iv': '9262859232435825',
    'domain': 'https://draplay2.pro'
}

export async function getWatch(slug){
    const raw = await fetchText('/videos/'+slug);

}