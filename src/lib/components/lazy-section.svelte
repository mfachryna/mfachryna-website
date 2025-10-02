<script lang="ts">
    import { onMount } from 'svelte';
    import WorkSkeleton from '$lib/components/skeletons/work-skeleton.svelte';
    import ExperiencesSkeleton from '$lib/components/skeletons/experiences-skeleton.svelte';

    export let apiEndpoint: string;
    export let componentName: string;
    export let sectionId: string;
    export let skeletonRows = 3;

    let Component: any = null;
    let data: any = null;
    let loading = true;
    let error: string | null = null;
    let elementRef: HTMLElement;
    let hasLoaded = false;

    const componentMap: Record<string, () => Promise<any>> = {
        experiences: () => import('$lib/components/homepage/experiences-section.svelte'),
        work: () => import('$lib/components/homepage/work-section.svelte'),
        blogs: () => import('$lib/components/homepage/blog-section.svelte'),
        contacts: () => import('$lib/components/homepage/contacts-section.svelte')
    };

    async function loadSection() {
        if (hasLoaded) return;
        hasLoaded = true;

        try {
            const [componentModule, response] = await Promise.all([
                componentMap[componentName](),
                fetch(apiEndpoint)
            ]);

            if (!response.ok) throw new Error('Failed to fetch data');

            const responseData = await response.json();

            if (componentName === 'work') {
                data = {
                    projects: responseData.projects || [],
                    pagination: responseData.pagination
                };
            } else if (componentName === 'experiences') {
                data = {
                    experiences: responseData.experiences || [],
                    pagination: responseData.pagination
                };
            } else {
                data = responseData;
            }

            Component = componentModule.default;

        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load section';
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasLoaded) {
                        loadSection();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '200px' }
        );

        if (elementRef) observer.observe(elementRef);
        return () => observer.disconnect();
    });
</script>

<div bind:this={elementRef} class="min-h-[300px]">
    {#if loading}
        {#if componentName === 'work'}
            <WorkSkeleton {skeletonRows} />
        {:else if componentName === 'experiences'}
            <ExperiencesSkeleton {skeletonRows} />
        {:else}
            <section class="bg-background relative w-full py-20" id={sectionId}>
                <div class="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-28">
                    <div class="mb-8">
                        <div class="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200/50"></div>
                        <div class="h-1 w-24 animate-pulse rounded bg-gray-200/50"></div>
                    </div>
                    {#each Array(skeletonRows) as _}
                        <div class="mb-4 animate-pulse rounded-xl border border-gray-200/30 p-4">
                            <div class="mb-2 h-6 w-3/4 rounded bg-gray-200/50"></div>
                            <div class="mb-2 h-4 w-1/2 rounded bg-gray-200/50"></div>
                        </div>
                    {/each}
                </div>
            </section>
        {/if}
    {:else if error}
        <section class="bg-background relative w-full py-20" id={sectionId}>
            <div class="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-28 text-center">
                <p class="text-red-500 mb-4">{error}</p>
                <button
                    class="bg-primary text-primary-foreground rounded px-4 py-2 hover:opacity-80 transition-opacity"
                    onclick={() => {
                        hasLoaded = false;
                        error = null;
                        loading = true;
                        loadSection();
                    }}
                >
                    Retry
                </button>
            </div>
        </section>
    {:else if Component && data}
        <svelte:component this={Component} {data} />
    {/if}
</div>