<script>
  import Fa from 'svelte-fa'
  import { faHome, faList, faSearch, faFilm, faFire } from '@fortawesome/free-solid-svg-icons'
</script>
<nav class="bg-gray-800  fixed p-1 bottom-0 w-full max-w-5xl z-[1000] rounded-t-xl">
    <ul class="sticky flex justify-around items-center gap-2">
        <a href="/">
            <li class="text-center text-md cursor-pointer hover:text-xl">
                <Fa icon={faHome} class="m-[auto] mt-4"/>
                <p>Home</p>
            </li>
        </a>
        <a href="/menus">
            <li class="text-center text-md cursor-pointer hover:text-xl">
                <Fa icon={faList} class="m-[auto] mt-4"/>
                <p>Menu</p>
            </li>
        </a>
        <a href="/search">
            <li class="text-center text-md cursor-pointer hover:text-xl">
                <Fa icon={faSearch} class="m-[auto] mt-4"/>
                <p>Search</p>
            </li>
        </a>
        <a href="/movie/1" data-sveltekit-reload>
            <li class="text-center text-md cursor-pointer hover:text-xl">
                <Fa icon={faFilm} class="m-[auto] mt-4"/>
                <p>Movies</p>
            </li>
        </a>
        <a href="/sub/1" data-sveltekit-reload>
            <li class="text-center text-md cursor-pointer hover:text-xl">
                <Fa icon={faFire} class="m-[auto] mt-4"/>
                <p>Latest</p>
            </li>
        </a>
    </ul>
</nav>