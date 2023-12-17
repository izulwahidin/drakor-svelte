import { error } from "@sveltejs/kit";

export async function load({ url, params }) {
    const {pages} = params
    // const { pathname, origin} = url

    $: {
        switch (pages) {
            case 'sub':
                break;
            case 'raw':
                break;
            case 'movie':
                break;
            case 'kshow':
                break;
            case 'popular':
                break;
            case 'ongoing':
                break;
            default:
                throw error(404, 'Not found');
        }
    }

    // try {
    //     const res = await fetch(`${origin+pathname}/api`).then(r => r.json())
    //     console.log(res)
    //     return res
    // } catch (error) {
    //     console.log(error)
    // }
    

}

