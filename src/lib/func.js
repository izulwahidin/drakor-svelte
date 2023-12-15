import { LRUCache } from 'lru-cache'
import { auth, provider, signInWithPopup, signOut } from '$lib/firebase.js'
import { CryptoJS } from 'crypto-js'

// Your secret key and IV (Initialization Vector)
const secretKey = 'DoubleUGroup'; // Replace with your own secret key
const iv = 'a11112222bcdegf'; // Replace with your own IV (16 bytes)

const cacheOption = {
    max: 500,
    ttl: 60000 * 30,
}

export const cache = new LRUCache(cacheOption);


const op_img = (url) => {
    let wp = `https://i0.wp.com/${url.split('//')[1]}`;
    return wp
}

export const parseTimestamps = (timestamp) => {
    if (timestamp.includes('ago')) {
        const agoRegex = /(\d+) (minutes|hour|hours|day) ago/;
        const match = timestamp.match(agoRegex);

        if (match) {
            const unit = match[2];
            let amount = parseInt(match[1]);

            if (unit === 'hour' || unit === 'hours') {
                amount *= 60; // convert hours to minutes
            } else if (unit === 'day') {
                amount *= 24 * 60; // convert days to minutes
            }

            const currentDate = new Date();
            const newDate = new Date(currentDate.getTime() - amount * 60000); // subtract minutes

            return formatDate(newDate);
        }
    } else {
        return timestamp.split(' ')[0];
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const getCurrentUpdateAt = (episodes, targetUrl) => {
    // Iterate through the episodes array
    for (let i = 0; i < episodes.length; i++) {
      // Check if the current episode has the target URL
      if (episodes[i].url === targetUrl) {
        // Return the update_at data if a match is found
        return episodes[i].update_at;
      }
    }
  
    // Return null if no match is found
    return null;
  }

export default op_img


export const signInWithGoogleHandler = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error('Error signing in with Google', error.message);
    }
};
export const signOutHandler = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error logout', error.message);
    }
};

export function isSlugMatched(array, targetSlug) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].slug === targetSlug) {
        return true;
      }
    }
    return false;
  }


  // Encryption function
  export function encryptUrl(url, key, salt) {
    const encrypted = CryptoJS.AES.encrypt(url, key + salt);
    return encrypted.toString();
}

// Decryption function
export function decryptUrl(encryptedUrl, key, salt) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedUrl, key + salt);
    const decryptedUrl = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedUrl;
}

export async function fetchText(url){
    const res = await fetch(url);
    return await res.text()
}

export async function fetchJson(url){
    const res = await fetch(url);
    return await res.json()
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}