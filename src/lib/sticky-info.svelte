<script>
    import {PUBLIC_SITE_TITLE} from '$env/static/public'
    import Fa from 'svelte-fa'
    import { faCoffee } from '@fortawesome/free-solid-svg-icons'
    

</script>

<nav class="bg-gray-800  fixed p-4 top-0 w-full max-w-5xl z-[1000] rounded-b-xl">
    <ul class="sticky flex justify-between items-center gap-4">
        <li class="w-full flex gap-4">
            <img class="h-[25px] " src="/logo.svg" alt="{PUBLIC_SITE_TITLE} Logo">
            <h1 class="truncate text-md">Watch Drama For Free</h1>
        </li>
        <li class="flex gap-5">
            <a href="https://www.buymeacoffee.com/anirealm" target="_blank" rel="noopener noreferrer" class="animate-pulse text-green-500 font-bold flex gap-1 items-center">Donate <Fa icon={faCoffee} /></a>
        </li>
    </ul>
</nav>
