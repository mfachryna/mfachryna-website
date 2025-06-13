<script lang="ts">
    import { onMount } from 'svelte';
    
    export let apiEndpoint: string;
    export let componentImport: () => Promise<any>;
    export let threshold = 0.1;
    export let rootMargin = '100px';
    
    let elementRef: HTMLElement;
    let component: any = null;
    let data: any = null;
    let loading = false;
    let error: Error | null = null;
    
    onMount(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                entries.forEach(async (entry) => {
                    if (entry.isIntersecting && !component && !loading) {
                        loading = true;
                        try {
                            // Load component and data in parallel
                            const [comp, response] = await Promise.all([
                                componentImport(),
                                fetch(apiEndpoint)
                            ]);
                            
                            component = comp;
                            data = await response.json();
                        } catch (err) {
                            error = err;
                        } finally {
                            loading = false;
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold, rootMargin }
        );
        
        if (elementRef) {
            observer.observe(elementRef);
        }
        
        return () => observer.disconnect();
    });
</script>

<div bind:this={elementRef} class="min-h-[200px]">
    {#if loading}
        <div class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    {:else if error}
        <div class="text-red-500 text-center py-20">Failed to load content</div>
    {:else if component && data}
        <svelte:component this={component} {data} />
    {/if}
</div>