<script lang="ts">
    export let border = 'border-primary';
    export let text = 'text-primary';
    export let background = 'bg-transparent';
    export let small = false;
</script>

<div class={`${small ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-3'} border rounded-full items-center ${border} ${text} ${background}`}>
    <slot />
</div>