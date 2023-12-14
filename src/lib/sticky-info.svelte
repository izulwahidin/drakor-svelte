<script>
    import {PUBLIC_SITE_TITLE} from '$env/static/public'
    import Fa from 'svelte-fa'
    import { faCoffee, faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'
    import { auth, onAuthStateChanged } from '$lib/firebase';
    import { signInWithGoogleHandler, signOutHandler } from '$lib/func.js';

    let user;

    onAuthStateChanged(auth, (currentUser) => {
        user = currentUser;
    });
    

</script>

<nav class="bg-gray-800  fixed p-4 top-0 w-full max-w-5xl z-[1000] rounded-b-xl">
    <ul class="sticky flex justify-between items-center gap-4">
        <li class="w-full flex gap-{user ? '2' : '4'}">
            <img class="h-[25px] {user ? 'rounded-lg' : ''}" src={user ? user.photoURL : "/logo.svg" } alt="{PUBLIC_SITE_TITLE} Logo">
            <h1 class="truncate text-md">{user ? `Hi, ${user.displayName} `: `Watch Anime For Free`}</h1>
        </li>
        <li class="flex gap-5">
            <a href="https://www.buymeacoffee.com/anirealm" target="_blank" rel="noopener noreferrer" class="animate-pulse text-green-500 font-bold flex gap-1 items-center">Donate <Fa icon={faCoffee} /></a>
            {#if user}
                <button on:click={signOutHandler} class="animate-pulse text-red-500 font-bold flex gap-1 items-center">Logout <Fa icon={faSignOut} /></button>
            {:else}
                <button on:click={signInWithGoogleHandler} class="animate-pulse text-yellow-500 font-bold flex gap-1 items-center">Login <Fa icon={faUserCircle} /></button>
            {/if}
        </li>
    </ul>
</nav>
