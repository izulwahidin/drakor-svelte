<script>
    export let title, is_center
    is_center = (is_center === true) ?"text-center":'false';
</script>

<h2 class="{is_center} text-xl bg-secondary p-2 bg-gradient-to-l from-primary to-transparent rounded mb-1">{title}</h2>