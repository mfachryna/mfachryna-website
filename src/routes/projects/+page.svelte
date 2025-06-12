<script lang="ts">
  import ProjectCard from '$lib/components/project-card.svelte';
  import type { ProjectWithTags } from '$lib/types/project';

  export let data;
  let projects: ProjectWithTags[] = data.projects;
</script>

<div class="container mx-auto px-4 py-16">
  <h1 class="text-4xl font-bold mb-8">All Projects</h1>

  <div class="flex flex-col gap-8">
    {#each projects as project (project.id)}
      <ProjectCard project={{
        ...project,
        tags: project.tags.map(tag => tag.name)
      }} />
    {/each}
  </div>
</div>