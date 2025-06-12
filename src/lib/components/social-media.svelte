<script>
    import { onMount } from "svelte";
	import { Button } from '$lib/components/ui/button/index.js';
	import { Moon, Sun } from "@lucide/svelte";
	import { toggleMode } from "mode-watcher";
    /**
	 * @type {any[]}
	 */
    let navLinksWithLogos = [];

    const navLinks = [
        { name: "Github", href: "https://github.com/mfachryna", logo: "github" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/mfachryna", logo: "linkedin" },
        { name: "Instagram", href: "https://instagram.com/mfachryna", logo: "instagram" },
        { name: "Steam", href: "https://steamcommunity.com/id/Croazt18/", logo: "steam" },
    ];

    async function loadLogos() {
        navLinksWithLogos = await Promise.all(
            navLinks.map(async (link) => {
                const module = await import(`$lib/assets/icons/contacts/${link.logo}.svelte`);
                return { ...link, component: module.default };
            })
        );
    }

    onMount(loadLogos);
</script>

<section
    class="hidden md:flex fixed h-full items-center justify-between text-center flex-col px-6 y-1 z-50"
    style="transition: all 0.5s ease-in-out;"
>
    <div class="h-2/5 bg-accent w-1 mb-3 rounded-full"></div>
    
    {#each navLinksWithLogos as link}
        <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-accent my-3 w-7 h-7">
            <svelte:component this={link.component} class="my-3 w-7 h-7" />
        </a>
    {/each}

    <Button onclick={toggleMode} size="icon" class="rounded-full my-3 w-8 h-8 bg-accent hover:bg-accent/50" variant="outline">
        <Sun
            class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Moon
            class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
    <div class="h-2/5 bg-accent w-1 mt-3 rounded-full"></div>
</section>
