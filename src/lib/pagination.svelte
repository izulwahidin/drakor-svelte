<script>
    import Fa from 'svelte-fa'
    import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
    export let data
    console.log(data)

</script>

<nav>
    <ul class="pagination flex gap-1 items-center justify-center my-3 sm:gap-2">
        {#each data as pagination}
            {#if pagination.is_active === false}
                <a href="{pagination.page}" data-sveltekit-reload>
                    <li class={pagination.is_active === true ? " !bg-accent ":" "}>
                            {#if pagination.isNextPrev === null}
                                {pagination.page}
                            {:else if pagination.isNextPrev !== false}
                                <Fa icon={pagination.isNextPrev==="next"?faAngleDoubleRight:faAngleDoubleLeft} />
                            {:else}
                                {pagination.page}
                            {/if}
                    </li>
                </a>
            {:else}
                <li class={pagination.is_active === true ? " !bg-accent ":" "}>
                        {#if pagination.isNextPrev === null}
                            {pagination.page}
                        {:else if pagination.isNextPrev !== false}
                            <Fa icon={pagination.isNextPrev==="next"?faAngleDoubleRight:faAngleDoubleLeft} />
                        {:else}
                            {pagination.page}
                        {/if}
                </li>
            {/if}
        {/each}
    </ul>
</nav>