<script lang="ts">
  export let skeletonRows = 3;
</script>

<section class="section-padding relative min-h-[600px] flex flex-col justify-center" id="experiences" aria-labelledby="experiences-title">
  <div class="container-modern relative z-10 w-full">
    <header class="mb-20 space-y-4 text-center">
      <div class="inline-block">
        <span class="text-foreground mb-2 block text-sm font-medium tracking-widest uppercase">My Journey</span>
        <div class="mx-auto h-10 w-64 animate-pulse rounded bg-foreground/20"></div>
      </div>
      <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary via-accent to-primary"></div>
      <div class="mx-auto max-w-2xl">
        <div class="mx-auto h-4 w-3/4 animate-pulse rounded bg-foreground/10"></div>
        <div class="mx-auto h-4 w-1/2 animate-pulse rounded bg-foreground/10"></div>
      </div>
    </header>

    <div class="relative w-full min-h-[400px] flex flex-col justify-center">
      <div class="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-primary via-accent to-primary md:left-1/2 md:-translate-x-1/2 md:transform"></div>
      <ul class="space-y-8 w-full">
        {#each Array(skeletonRows) as _, i}
          <li class="relative flex items-center md:justify-center w-full">
            <div class="absolute left-8 z-20 md:left-1/2 md:-translate-x-1/2 md:transform">
              <div class="relative">
                <div class="from-primary/30 to-accent/30 absolute inset-0 -m-1 h-6 w-6 animate-ping rounded-full bg-gradient-to-br"></div>
                <div class="from-primary via-primary/80 to-accent border-background shadow-glow relative h-4 w-4 rounded-full border-2 bg-gradient-to-br"></div>
              </div>
            </div>
            <div class="ml-20 w-full md:ml-0 md:w-6/12 lg:w-5/12 xl:w-6/12 {i % 2 === 0 ? 'md:mr-auto md:pr-4 lg:pr-6 xl:pr-8' : 'md:ml-auto md:pl-4 lg:pl-6 xl:pl-8'} flex flex-col justify-center">
              <div class="card-modern border border-border/10 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl w-full min-h-[220px] flex flex-col justify-center">
                <div class="mb-4 flex items-start justify-between">
                  <div class="flex-1 space-y-2">
                    <div class="flex flex-wrap items-center gap-2">
                      <div class="h-5 w-32 animate-pulse rounded-full bg-foreground/25"></div>
                      <div class="h-4 w-24 animate-pulse rounded bg-foreground/10"></div>
                    </div>
                    <div class="mb-2 h-6 w-48 animate-pulse rounded bg-foreground/13"></div>
                    <div class="mb-1 h-4 w-36 animate-pulse rounded bg-foreground/9"></div>
                    <div class="h-5 w-40 animate-pulse rounded bg-foreground/11"></div>
                  </div>
                  <div class="ml-6 flex-shrink-0">
                    <span class="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-foreground/10"><span class="h-4 w-4 animate-pulse rounded bg-foreground/25"></span></span>
                  </div>
                </div>
                <div class="mb-4 space-y-2">
                  <div class="h-4 w-full animate-pulse rounded bg-foreground/10"></div>
                  <div class="h-4 w-5/6 animate-pulse rounded bg-foreground/10"></div>
                  <div class="h-4 w-4/6 animate-pulse rounded bg-foreground/10"></div>
                </div>
                <div class="mb-4 flex flex-wrap gap-2">
                  {#each Array(4) as _, tagIndex}
                    <span class="h-6 w-16 animate-pulse rounded-full bg-foreground/29" style="animation-delay: {i * 0.2 + tagIndex * 0.1}s"></span>
                  {/each}
                  <span class="h-6 w-12 animate-pulse rounded-full bg-foreground/25"></span>
                </div>
                {#if i === 0}
                  <div class="mt-4 space-y-4 border-t pt-4" style="border-color: var(--border); opacity: 0.19;">
                    <div class="mb-3 flex items-center gap-2">
                      <span class="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-primary/40 to-accent/40"></span>
                      <span class="h-4 w-32 animate-pulse rounded bg-foreground/29"></span>
                      <span class="h-4 w-8 animate-pulse rounded-full bg-foreground/27"></span>
                    </div>
                    <div class="space-y-3">
                      {#each Array(3) as _, achievementIndex}
                        <div class="flex items-start gap-3" style="animation-delay: {achievementIndex * 0.1}s">
                          <span class="flex h-6 w-6 flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-foreground/9"><span class="h-2 w-2 animate-pulse rounded bg-foreground/13"></span></span>
                          <div class="flex-1 space-y-1">
                            <div class="h-3 w-full animate-pulse rounded bg-foreground/27"></div>
                            <div class="h-3 w-4/5 animate-pulse rounded bg-foreground/27"></div>
                          </div>
                        </div>
                      {/each}
                    </div>
                    <div class="mt-4">
                      <div class="mb-3 flex items-center gap-2">
                        <span class="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-primary/90 to-accent/90"></span>
                        <span class="h-4 w-40 animate-pulse rounded bg-foreground/27"></span>
                        <span class="h-4 w-6 animate-pulse rounded-full bg-foreground/25"></span>
                      </div>
                      <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {#each Array(6) as _, techIndex}
                          <span class="h-7 animate-pulse rounded-lg bg-foreground/25" style="animation-delay: {techIndex * 0.05}s"></span>
                        {/each}
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    <footer class="mt-16 text-center">
      <div class="mx-auto h-12 w-48 animate-pulse rounded-xl bg-foreground/27"></div>
    </footer>
  </div>
</section>

<style>
  .card-modern {
    /* Glass morphism backdrop */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 0.8; }
    100% { opacity: 0.4; }
  }
</style>
