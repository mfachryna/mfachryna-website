<script lang="ts">
    import { onMount } from 'svelte';
    import PageTitle from '$lib/components/page-title.svelte';
    import Wave from '../wave.svelte';
    import Layer2 from '$lib/background/layer2.svelte';
    import ProjectCard from '../project-card.svelte';
    import type { ProjectWithTags } from '$lib/types/project';
    import Layer1 from '$lib/background/layer1.svelte';
    import Button from '../ui/button/button.svelte';
    import AnimateOnScroll from '$lib/components/animate-on-scroll.svelte';

    export let data: {
        projects: ProjectWithTags[];
        pagination?: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    } = {
        projects: []
    };

    let projects = data.projects;
    let isLoading = false;
    let error: string | null = null;
    let visibleProjects = 3;

    let currentPage = data.pagination?.page || 1;
    let limit = data.pagination?.limit || 6;
    let totalItems = data.pagination?.totalItems || 0;
    let totalPages = data.pagination?.totalPages || 0;

    let sectionRef: HTMLElement;

    $: showLoadMore = visibleProjects < projects.length || currentPage < totalPages;

    $: projectSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'SoftwareApplication',
                name: project.title,
                description: project.description,
                url: project.liveUrl || project.githubUrl,
                applicationCategory: 'WebApplication',
                operatingSystem: 'Any'
            }
        }))
    };

    function loadMoreProjects() {
        if (visibleProjects < projects.length) {
            visibleProjects += 3;
        } else if (currentPage < totalPages) {
            fetchMoreProjects(currentPage + 1);
        }
    }

    async function fetchMoreProjects(page: number) {
        try {
            isLoading = true;

            const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error('Failed to fetch more projects');
            }

            const result = await response.json();

            if (result.success) {
                projects = [...projects, ...result.projects];
                currentPage = result.pagination.page;
                totalItems = result.pagination.totalItems;
                totalPages = result.pagination.totalPages;

                visibleProjects += 3;
            } else {
                error = result.error || 'Failed to fetch more projects';
            }
        } catch (err) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = 'An unknown error occurred';
            }
            console.error('Error fetching more projects:', err);
        } finally {
            isLoading = false;
        }
    }

    async function fetchProjects(page: number = 1) {
        try {
            isLoading = true;

            const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const result = await response.json();

            if (result.success) {
                projects = result.projects;
                currentPage = result.pagination.page;
                totalItems = result.pagination.totalItems;
                totalPages = result.pagination.totalPages;

                visibleProjects = Math.min(3, projects.length);
            } else {
                error = result.error || 'Failed to fetch projects';
            }
        } catch (err) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = 'An unknown error occurred';
            }
            console.error('Error fetching projects:', err);
        } finally {
            isLoading = false;
        }
    }

    function retryFetch() {
        error = null;
        fetchProjects(1);
    }

    onMount(() => {
        if (projects.length === 0) {
            fetchProjects();
        } else {
            visibleProjects = Math.min(3, projects.length);
        }
    });
</script>

<svelte:head>
    <script type="application/ld+json">
    {JSON.stringify(projectSchema)}
    </script>
</svelte:head>

<section
    class="work-section relative w-full overflow-hidden bg-none"
    id="work"
    aria-labelledby="works-title"
    bind:this={sectionRef}
>
    <Wave position="pointer-events-none absolute top-0 left-0 w-full">
        <Layer2 fill="fill-background" />
    </Wave>

    <div
        class="bg-foreground mx-auto w-full px-6 py-10 sm:px-10 sm:py-20 md:px-16 md:py-40 lg:px-28"
        id="works"
    >
        <PageTitle title="works" textColor="text-background" line="bg-background" id="works-title" />

        {#if isLoading && projects.length === 0}
            <div class="flex justify-center py-10">
                <div
                    class="border-background h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"
                ></div>
            </div>
        {:else if error}
            <div class="mt-8 text-center">
                <p class="mb-4 text-red-300">{error}</p>
                <button
                    class="bg-background text-foreground hover:bg-background/90 rounded px-4 py-2 transition-colors"
                    on:click={retryFetch}
                >
                    Try Again
                </button>
            </div>
        {:else if projects.length === 0}
            <p class="text-background mt-8 text-center">No projects found.</p>
        {:else}
            <div class="flex flex-col gap-6">
                {#each projects.slice(0, visibleProjects) as project, i (project.id)}
                    <AnimateOnScroll 
                        animation="bounce" 
                        delay={100}
                        threshold={0.1}
                        rootMargin="0px 0px -10% 0px"
                    >
                        <ProjectCard
                            project={{
                                ...project,
                                tags: project.tags.map((tag) => (typeof tag === 'string' ? tag : tag.name))
                            }}
                            index={i}
                        />
                    </AnimateOnScroll>
                {/each}
            </div>

            {#if isLoading && projects.length > 0}
                <div class="flex justify-center py-6">
                    <div
                        class="border-background h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"
                    ></div>
                </div>
            {/if}

            {#if showLoadMore && !isLoading}
                <div class="relative z-20 mt-10 text-center">
                    <Button class="z-20" variant="outline_background" onclick={() => loadMoreProjects()}>
                        {#if visibleProjects < projects.length}
                            Show More Projects ({projects.length - visibleProjects} more)
                        {:else}
                            Load More Projects
                        {/if}
                    </Button>
                </div>
            {/if}

            {#if projects.length > 0}
                <div class="text-background/60 mt-4 text-center text-sm">
                    Showing {Math.min(visibleProjects, projects.length)} of {totalItems} projects
                </div>
            {/if}
        {/if}
    </div>

    <Wave position="pointer-events-none absolute bottom-0 left-0 w-full z-10">
        <Layer1 fill="fill-background" />
    </Wave>
</section>