import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const {pages} = params

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

}

