<script lang="ts">
  export let item;
  export let i;
  export let activeIndex;
  export let toggle;
  export let formatDate;
</script>

<div class="ml-20 w-full md:ml-0 md:w-6/12 lg:w-5/12 xl:w-6/12 {i % 2 === 0 ? 'md:mr-auto md:pr-4 lg:pr-6 xl:pr-8' : 'md:ml-auto md:pl-4 lg:pl-6 xl:pl-8'}">
  <div
    class="group experience-card cursor-pointer"
    on:click={() => toggle(i)}
    on:keydown={(e) => e.key === 'Enter' && toggle(i)}
    role="button"
    tabindex="0"
  >
    <div class="relative">
      <div class="relative mb-4 flex items-start justify-between">
        <div class="flex-1 space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <div class="from-primary/10 to-accent/10 border-primary/20 flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 backdrop-blur-sm">
              <svg class="text-primary h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-primary text-xs font-medium">
                {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
              </span>
            </div>
            {#if item.location}
              <div class="bg-foreground/1 border-foreground/10 flex items-center gap-1 rounded-full border px-2 py-1">
                <svg class="text-accent h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-foreground/30 text-xs">{item.location}</span>
              </div>
            {/if}
          </div>
          <div class="space-y-0.5">
            <h3 class="text-foreground group-hover:from-primary group-hover:to-accent text-lg font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent">
              {item.title}
            </h3>
            {#if item.role && item.role !== item.title}
              <p class="text-xs font-medium text-neutral-400">{item.role}</p>
            {/if}
          </div>
          <div class="flex items-center gap-2">
            <div class="from-primary to-accent h-4 w-0.5 rounded-full bg-gradient-to-b"></div>
            <p class="from-accent to-primary bg-gradient-to-r bg-clip-text text-base font-semibold text-transparent">
              {item.company}
            </p>
          </div>
        </div>
        <div class="ml-6 flex-shrink-0">
          <div class="group/button relative">
            <div class="from-primary to-accent absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur transition-opacity duration-300 group-hover:opacity-50"></div>
            <div class="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover/button:scale-110 group-hover/button:border-white/30 group-hover/button:bg-white/20">
              <svg class="h-4 w-4 text-white transition-all duration-300 {activeIndex === i ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative mb-3">
      <p class="text-foreground/60 line-clamp-3 text-xs leading-relaxed transition-colors duration-300">
        {item.description}
      </p>
    </div>
    {#if item.tags && item.tags.length > 0}
      {#if activeIndex !== i}
        <div class="mb-2 flex flex-wrap gap-1 ">
          {#each item.tags.slice(0, 5) as tag}
            <span class="bg-foreground/5 text-foreground/80 border-foreground/10 hover:bg-foreground/10 hover:text-foreground rounded border px-2 py-0.5 text-xs font-medium transition-all duration-200">
              {tag.name}
            </span>
          {/each}
          {#if item.tags.length > 5}
            <span class="bg-foreground/3 text-foreground/60 border-foreground/5 rounded border px-2 py-0.5 text-xs font-medium">
              +{item.tags.length - 5}
            </span>
          {/if}
        </div>
      {/if}
    {/if}
    {#if activeIndex === i}
      <div class="border-border collapsible-item mt-4 border-t pt-4" in:slide={{ duration: 350 }} out:slide={{ duration: 250 }}>
        <div in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
          {#if item.content}
            <div class="prose prose-sm max-w-none">
              <div class="text-foreground leading-relaxed">
                {@html item.content}
              </div>
            </div>
          {/if}
          {#if item.highlights && item.highlights.length > 0}
            <div>
              <h4 class="text-foreground top-0 -mt-2 mb-3 flex items-center py-2 font-semibold">
                <span class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"></span>
                Key Achievements
                {#if item.highlights.length > 5}
                  <span class="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-xs">
                    {item.highlights.length} items
                  </span>
                {/if}
              </h4>
              <div class="grid gap-3">
                {#each item.highlights as highlight, idx}
                  <div class="group flex items-start">
                    <div class="bg-accent/10 mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                      <span class="text-accent text-xs font-medium">{idx + 1}</span>
                    </div>
                    <div class="flex-1">
                      <p class="text-muted-foreground group-hover:text-foreground text-sm leading-relaxed transition-colors duration-200">
                        {highlight}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          {#if item.tags && item.tags.length > 4}
            <div>
              <h4 class="text-foreground sticky top-0 mt-2 mb-3 flex items-center py-2 font-semibold">
                <span class="from-primary to-accent mr-2 h-2 w-2 rounded-full bg-gradient-to-r"></span>
                Technologies & Skills
                <span class="bg-foreground/5 text-secondary-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
                  {item.tags.length}
                </span>
              </h4>
              <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
                {#each item.tags as tag}
                  <span class="bg-foreground/5 text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-3 py-1.5 text-center text-xs font-medium transition-all duration-200">
                    {tag.name}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
