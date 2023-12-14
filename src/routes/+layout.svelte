<script>
    import "../app.css";
    import StickyInfo from "$lib/sticky-info.svelte";
    import StickyMenu from "$lib/sticky-menu.svelte";
</script>
  
<StickyInfo/>
    <div class="main">
        <slot/>
    </div>
<StickyMenu/>