
<div class="fixed inset-0 -z-20 overflow-hidden">
	<style>
		:root.light & {
			.bg-primary\/25,
			.bg-primary\/28,
			.bg-primary\/24,
			.bg-primary\/20,
			.bg-primary\/35,
			.bg-primary\/22,
			.bg-primary\/18,
			.bg-primary\/14,
			.bg-primary\/15,
			.bg-primary\/12,
			.bg-primary\/13,
			.bg-primary\/10,
			.bg-accent\/22,
			.bg-accent\/18,
			.bg-accent\/26,
			.bg-accent\/30,
			.bg-accent\/35,
			.bg-accent\/21,
			.bg-accent\/23,
			.bg-accent\/28,
			.bg-accent\/20,
			.bg-accent\/17,
			.bg-accent\/12,
			.bg-accent\/14,
			.bg-accent\/15,
			.bg-accent\/16,
			.bg-accent\/19,
			.bg-accent\/13,
			.bg-accent\/11 {
				opacity: 0.85 !important;
				filter: none !important;
			}
			/* Gradients and geometric shapes */
			.from-primary\/12,
			.from-primary\/8,
			.from-primary\/7,
			.from-primary\/6,
			.from-primary\/15,
			.from-primary\/18,
			.from-primary\/16,
			.from-primary\/14,
			.from-primary\/28,
			.from-primary\/25,
			.from-primary\/24,
			.from-primary\/22,
			.from-primary\/20 {
				opacity: 0.7 !important;
			}
			.from-accent\/12,
			.from-accent\/10,
			.from-accent\/9,
			.from-accent\/8,
			.from-accent\/6,
			.from-accent\/15,
			.from-accent\/14,
			.from-accent\/13,
			.from-accent\/11,
			.from-accent\/28,
			.from-accent\/26,
			.from-accent\/23,
			.from-accent\/21,
			.from-accent\/20 {
				opacity: 0.7 !important;
			}
			/* Blur less in light mode for clarity */
			.blur-2xl,
			.blur-3xl {
				filter: blur(0.5rem) !important;
			}
		}
	</style>
	<!-- Background Gradient Base -->
	<div
		class="from-background via-background-secondary to-background absolute inset-0 bg-gradient-to-br"
	></div>

	<!-- Multi-layer Secondary and Tertiary Accent Orbs -->
	<div
		class="from-primary/12 to-accent/12 floating absolute top-1/6 right-1/6 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br opacity-60 blur-3xl"
	></div>
	<div
		class="from-accent/10 to-primary/10 floating-delayed absolute bottom-1/6 left-1/6 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tl opacity-55 blur-3xl"
	></div>
	<div
		class="from-primary/8 to-accent/8 floating-reverse absolute top-2/3 right-1/3 h-80 w-80 rounded-full bg-gradient-to-bl opacity-50 blur-2xl"
	></div>
	<div
		class="from-accent/9 to-primary/9 floating-slow absolute bottom-2/3 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr opacity-48 blur-2xl"
	></div>
	<div
		class="from-primary/7 to-accent/7 floating-gentle absolute top-1/3 left-2/3 h-72 w-72 rounded-full bg-gradient-to-r opacity-45 blur-2xl"
	></div>
	<div
		class="from-accent/6 to-primary/6 floating-gentle-delayed absolute right-2/3 bottom-1/3 h-88 w-88 rounded-full bg-gradient-to-l opacity-42 blur-2xl"
	></div>

	<!-- ENHANCED GRADIENT ORBS SYSTEM -->
	<div
		class="bg-gradient-radial from-primary/15 via-accent/8 floating absolute top-1/8 left-3/8 h-[20rem] w-[20rem] rounded-full to-transparent opacity-45 blur-2xl"
	></div>
	<div
		class="bg-gradient-radial from-accent/12 via-primary/6 floating-delayed absolute right-3/8 bottom-1/8 h-[24rem] w-[24rem] rounded-full to-transparent opacity-40 blur-2xl"
	></div>
	<div
		class="bg-gradient-conic from-primary/10 via-accent/8 to-primary/6 floating-reverse absolute top-3/8 left-1/8 h-64 w-64 rounded-full opacity-38 blur-xl"
	></div>
	<div
		class="bg-gradient-conic from-accent/9 via-primary/7 to-accent/5 floating-gentle absolute right-1/8 bottom-3/8 h-56 w-56 rounded-full opacity-35 blur-xl"
	></div>

	<!-- COMPLEX GEOMETRIC PATTERNS SYSTEM -->
	<!-- Diamond Grid Networks -->
	<!-- <div
			class="grid-accent absolute inset-0 opacity-[0.058]"
			style="background-size: 40px 40px;"
		></div>
		<div
			class="grid-accent absolute inset-0 opacity-[0.054]"
			style="background-size: 60px 60px;"
		></div>
		<div
			class="grid-accent absolute inset-0 opacity-[0.052]"
			style="background-size: 80px 80px;"
		></div> -->

	<!-- Voronoi-like Cellular Pattern -->
	<!-- <div
			class="absolute inset-0 opacity-[0.006]"
			style="background-image: radial-gradient(ellipse at 25% 25%, var(--primary) 30%, transparent 70%), radial-gradient(ellipse at 75% 75%, var(--accent) 30%, transparent 70%), radial-gradient(ellipse at 25% 75%, var(--primary) 25%, transparent 75%), radial-gradient(ellipse at 75% 25%, var(--accent) 25%, transparent 75%); background-size: 200px 200px;"
		></div> -->

	<!-- GEOMETRIC ACCENT SHAPES SYSTEM -->
	<!-- Primary Complex Shapes -->
	<!-- <div
			class="from-primary/15 to-accent/10 floating absolute top-1/12 left-1/12 h-20 w-20 rotate-12 bg-gradient-to-br opacity-30"
			style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation-delay: -0.8s;"
		></div>
		<div
			class="from-accent/12 to-primary/8 floating-reverse absolute right-1/12 bottom-1/12 h-24 w-24 -rotate-18 bg-gradient-to-tl opacity-28"
			style="clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); animation-delay: -2.3s;"
		></div> -->
	<div
		class="from-primary/18 floating-gentle absolute top-1/4 right-1/12 h-16 w-16 rotate-45 bg-gradient-to-bl to-transparent opacity-32"
		style="clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); animation-delay: -1.5s;"
	></div>
	<div
		class="from-accent/14 floating-slow absolute bottom-1/4 left-1/12 h-22 w-22 -rotate-30 bg-gradient-to-tr to-transparent opacity-26"
		style="clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); animation-delay: -3.1s;"
	></div>

	<!-- Secondary Geometric Shapes -->
	<div
		class="from-primary/12 to-accent/8 floating-delayed absolute top-3/4 left-1/4 h-18 w-18 rotate-60 bg-gradient-to-r opacity-24"
		style="clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%); animation-delay: -4.2s;"
	></div>
	<div
		class="from-accent/10 to-primary/6 floating absolute right-1/4 bottom-3/4 h-28 w-28 -rotate-45 bg-gradient-to-l opacity-22"
		style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%); animation-delay: -0.7s;"
	></div>
	<div
		class="from-primary/16 floating-reverse absolute top-2/3 right-3/4 h-14 w-14 rotate-90 bg-gradient-to-t to-transparent opacity-28"
		style="clip-path: circle(50% at 50% 50%); animation-delay: -5.6s;"
	></div>
	<div
		class="from-accent/13 floating-gentle absolute bottom-2/3 left-3/4 h-26 w-26 -rotate-15 bg-gradient-to-b to-transparent opacity-25"
		style="clip-path: ellipse(50% 80% at 50% 50%); animation-delay: -2.9s;"
	></div>

	<!-- Tertiary Complex Shapes -->
	<div
		class="bg-gradient-conic from-primary/14 via-accent/10 to-primary/14 floating-slow absolute top-5/6 right-5/6 h-12 w-12 rotate-180 opacity-20"
		style="clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%); animation-delay: -6.4s;"
	></div>
	<div
		class="bg-gradient-conic from-accent/11 via-primary/8 to-accent/11 floating absolute bottom-5/6 left-5/6 h-16 w-16 -rotate-75 opacity-18"
		style="clip-path: polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%); animation-delay: -1.2s;"
	></div>

	<!-- ENHANCED FLOATING PARTICLES ECOSYSTEM -->
	<!-- Macro Particles (Large) -->
	<!-- <div
			class="bg-gradient-radial from-primary/40 to-accent/20 animate-pulse-slow floating absolute top-1/20 left-1/20 h-6 w-6 rounded-full"
			style="animation-delay: -0.3s; filter: blur(0.5px);"
		></div>
		<div
			class="bg-gradient-radial from-accent/35 to-primary/18 animate-pulse-slower floating-reverse absolute right-1/20 bottom-1/20 h-5 w-5 rounded-full"
			style="animation-delay: -2.7s; filter: blur(0.3px);"
		></div> -->
	<div
		class="bg-gradient-conic from-primary/32 via-accent/15 to-primary/32 animate-pulse-slowest floating-gentle absolute top-19/20 left-19/20 h-4.5 w-4.5 rounded-full"
		style="animation-delay: -4.1s; filter: blur(0.4px);"
	></div>
	<div
		class="bg-gradient-conic from-accent/38 via-primary/20 to-accent/38 animate-pulse-slow floating-slow absolute right-19/20 bottom-19/20 h-5.5 w-5.5 rounded-full"
		style="animation-delay: -1.6s; filter: blur(0.2px);"
	></div>

	<!-- Meso Particles (Medium-Large) -->
	<!-- <div
			class="from-primary/28 to-accent/15 animate-pulse-slower floating-delayed absolute top-3/20 right-7/20 h-3.5 w-3.5 rounded-full bg-gradient-to-br"
			style="animation-delay: -5.2s; box-shadow: 0 0 8px var(--primary);"
		></div>
		<div
			class="from-accent/30 to-primary/16 animate-pulse-slowest floating absolute bottom-7/20 left-3/20 h-4 w-4 rounded-full bg-gradient-to-tl"
			style="animation-delay: -0.9s; box-shadow: 0 0 6px var(--accent);"
		></div> -->
	<div
		class="from-primary/25 to-accent/12 animate-pulse-slow floating-reverse absolute top-17/20 right-13/20 h-3 w-3 rounded-full bg-gradient-to-bl"
		style="animation-delay: -3.4s; box-shadow: 0 0 10px var(--primary);"
	></div>
	<div
		class="from-accent/27 to-primary/14 animate-pulse-slower floating-gentle absolute bottom-13/20 left-17/20 h-3.5 w-3.5 rounded-full bg-gradient-to-tr"
		style="animation-delay: -6.8s; box-shadow: 0 0 7px var(--accent);"
	></div>

	<!-- Micro Particles (Enhanced Detail) -->
	<!-- <div
			class="bg-primary/22 animate-pulse-slowest floating-slow absolute top-9/20 left-11/20 h-2 w-2 rounded-full"
			style="animation-delay: -7.5s; opacity: 0.8;"
		></div>
		<div
			class="bg-accent/18 animate-pulse-slow floating-delayed absolute right-9/20 bottom-11/20 h-1.5 w-1.5 rounded-full"
			style="animation-delay: -2.1s; opacity: 0.7;"
		></div> -->
	<div
		class="bg-primary/24 animate-pulse-slower floating absolute top-11/20 right-11/20 h-2.5 w-2.5 rounded-full"
		style="animation-delay: -4.7s; opacity: 0.6;"
	></div>
	<div
		class="bg-accent/16 animate-pulse-slowest floating-reverse absolute bottom-9/20 left-9/20 h-1 w-1 rounded-full"
		style="animation-delay: -1.3s; opacity: 0.5;"
	></div>

	<!-- Nano Particles (Ultra Detail) -->
	<!-- <div
			class="bg-primary/14 animate-pulse-slow floating-gentle absolute top-7/20 left-13/20 h-0.5 w-0.5 rounded-full"
			style="animation-delay: -8.9s;"
		></div>
		<div
			class="bg-accent/12 animate-pulse-slower floating-slow absolute right-7/20 bottom-13/20 h-1 w-1 rounded-full"
			style="animation-delay: -0.4s;"
		></div> -->
	<div
		class="bg-primary/10 animate-pulse-slowest floating-delayed absolute top-13/20 left-7/20 h-0.5 w-0.5 rounded-full"
		style="animation-delay: -5.8s;"
	></div>
	<div
		class="bg-accent/13 animate-pulse-slow floating absolute right-13/20 bottom-7/20 h-1 w-1 rounded-full"
		style="animation-delay: -3.2s;"
	></div>

	<!-- Enhanced Edge Gradients -->
	<div
		class="from-primary/8 via-primary/4 absolute top-0 left-0 h-40 w-full bg-gradient-to-b to-transparent opacity-60"
	></div>
	<div
		class="from-accent/8 via-accent/4 absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t to-transparent opacity-55"
	></div>
	<div
		class="from-primary/6 via-primary/3 absolute top-0 left-0 h-full w-40 bg-gradient-to-r to-transparent opacity-50"
	></div>
	<div
		class="from-accent/6 via-accent/3 absolute top-0 right-0 h-full w-40 bg-gradient-to-l to-transparent opacity-50"
	></div>

	<!-- Corner Enhancement Gradients -->
	<div
		class="bg-gradient-radial from-primary/5 absolute top-0 left-0 h-80 w-80 rounded-br-full to-transparent opacity-40"
	></div>
	<div
		class="bg-gradient-radial from-accent/5 absolute top-0 right-0 h-80 w-80 rounded-bl-full to-transparent opacity-40"
	></div>
	<div
		class="bg-gradient-radial from-accent/5 absolute bottom-0 left-0 h-80 w-80 rounded-tr-full to-transparent opacity-40"
	></div>
	<div
		class="bg-gradient-radial from-primary/5 absolute right-0 bottom-0 h-80 w-80 rounded-tl-full to-transparent opacity-40"
	></div>

	<!-- Multi-layer Grid Systems -->
	<div
		class="absolute inset-0 opacity-[0.025]"
		style="background-image: linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px); background-size: 60px 60px;"
	></div>
	<!-- <div
			class="absolute inset-0 opacity-[0.022]"
			style="background-image: linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px); background-size: 80px 80px; transform: rotate(30deg);"
		></div>
		<div
			class="absolute inset-0 opacity-[0.018]"
			style="background-image: linear-gradient(var(--foreground) 2px, transparent 2px), linear-gradient(90deg, var(--foreground) 2px, transparent 2px); background-size: 120px 120px; transform: rotate(-15deg);"
		></div>

		<!-- Hexagonal Grid Pattern -->
	<div
		class="absolute inset-0 opacity-[0.011]"
		style="background-image: radial-gradient(circle at 30px 15px, var(--foreground) 2px, transparent 2px); background-size: 60px 52px;"
	></div>
	<div
		class="absolute inset-0 opacity-[0.018]"
		style="background-image: radial-gradient(circle at 40px 20px, var(--foreground) 1.5px, transparent 1.5px); background-size: 80px 69px; transform: rotate(60deg);"
	></div>

	<!-- Constellation Dot Patterns -->
	<div
		class="absolute inset-0 opacity-[0.035]"
		style="background-image: radial-gradient(circle at 15% 15%, var(--primary) 2px, transparent 2px), radial-gradient(circle at 85% 25%, var(--accent) 1.5px, transparent 1.5px), radial-gradient(circle at 35% 75%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 75% 85%, var(--accent) 2px, transparent 2px), radial-gradient(circle at 25% 45%, var(--primary) 1.5px, transparent 1.5px); background-size: 180px 180px, 140px 140px, 160px 160px, 200px 200px, 120px 120px;"
	></div>

	<!-- Advanced Constellation Layers -->
	<div
		class="absolute inset-0 opacity-[0.025]"
		style="background-image: radial-gradient(circle at 60% 10%, var(--accent) 1px, transparent 1px), radial-gradient(circle at 10% 60%, var(--primary) 1.5px, transparent 1.5px), radial-gradient(circle at 90% 70%, var(--accent) 1px, transparent 1px), radial-gradient(circle at 40% 30%, var(--primary) 2px, transparent 2px), radial-gradient(circle at 70% 90%, var(--accent) 1.5px, transparent 1.5px); background-size: 220px 220px, 190px 190px, 170px 170px, 240px 240px, 130px 130px;"
	></div>

	<!-- Stellar Field Pattern -->
	<div
		class="absolute inset-0 opacity-[0.02]"
		style="background-image: radial-gradient(circle at 20% 80%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--accent) 1px, transparent 1px), radial-gradient(circle at 50% 50%, var(--primary) 0.5px, transparent 0.5px), radial-gradient(circle at 30% 60%, var(--accent) 1.5px, transparent 1.5px); background-size: 300px 300px, 250px 250px, 100px 100px, 180px 180px;"
	></div>

	<!-- ENHANCED DOT ACCENT SYSTEM -->
	<!-- Scattered Dot Clusters -->
	<div class="bg-primary/25 absolute top-1/10 left-1/10 h-2 w-2 rounded-full opacity-70"></div>
	<div class="bg-accent/22 absolute top-2/10 right-1/10 h-1.5 w-1.5 rounded-full opacity-65"></div>
	<div class="bg-primary/28 absolute top-3/10 left-3/10 h-3 w-3 rounded-full opacity-60"></div>
	<div class="bg-accent/18 absolute top-4/10 right-2/10 h-1 w-1 rounded-full opacity-75"></div>
	<div class="bg-primary/24 absolute top-6/10 left-2/10 h-2.5 w-2.5 rounded-full opacity-55"></div>
	<div class="bg-accent/26 absolute top-7/10 right-3/10 h-2 w-2 rounded-full opacity-68"></div>
	<div class="bg-primary/20 absolute top-8/10 left-4/10 h-1.5 w-1.5 rounded-full opacity-62"></div>
	<div class="bg-accent/30 absolute top-9/10 right-4/10 h-3.5 w-3.5 rounded-full opacity-58"></div>
	<!-- Extra Squares -->
	<div
		class="from-primary/20 to-accent/15 absolute top-[8%] left-[22%] h-3 w-3 rotate-12 bg-gradient-to-br opacity-58"
	></div>
	<div
		class="from-accent/18 to-primary/12 absolute top-[17%] right-[19%] h-2 w-2 -rotate-18 bg-gradient-to-tl opacity-62"
	></div>
	<div
		class="from-primary/22 to-accent/17 absolute top-[29%] left-[35%] h-4 w-4 rotate-25 bg-gradient-to-bl opacity-55"
	></div>
	<div
		class="from-accent/16 to-primary/14 absolute top-[38%] right-[28%] h-2.5 w-2.5 -rotate-30 bg-gradient-to-tr opacity-64"
	></div>
	<div
		class="from-primary/24 to-accent/19 absolute top-[51%] left-[47%] h-3.5 w-3.5 rotate-45 bg-gradient-to-r opacity-53"
	></div>
	<div
		class="from-accent/20 to-primary/16 absolute top-[62%] right-[45%] h-2 w-2 -rotate-15 bg-gradient-to-l opacity-66"
	></div>
	<!-- Extra Geometric Shapes -->
	<div
		class="from-primary/15 to-accent/10 floating absolute top-[13%] left-[11%] h-20 w-20 rotate-12 bg-gradient-to-br opacity-30"
		style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"
	></div>
	<div
		class="from-accent/12 to-primary/8 floating-reverse absolute right-[9%] bottom-[7%] h-24 w-24 -rotate-18 bg-gradient-to-tl opacity-28"
		style="clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);"
	></div>
	<div
		class="from-primary/18 floating-gentle absolute top-[23%] right-[13%] h-16 w-16 rotate-45 bg-gradient-to-bl to-transparent opacity-32"
		style="clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);"
	></div>
	<div
		class="from-accent/14 floating-slow absolute bottom-[27%] left-[17%] h-22 w-22 -rotate-30 bg-gradient-to-tr to-transparent opacity-26"
		style="clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);"
	></div>
	<!-- Extra Gradient Orbs -->
	<div
		class="bg-gradient-radial from-primary/15 via-accent/8 floating absolute top-[18%] left-[38%] h-[20rem] w-[20rem] rounded-full to-transparent opacity-45 blur-2xl"
	></div>
	<div
		class="bg-gradient-radial from-accent/12 via-primary/6 floating-delayed absolute right-[33%] bottom-[18%] h-[24rem] w-[24rem] rounded-full to-transparent opacity-40 blur-2xl"
	></div>
	<div
		class="bg-gradient-conic from-primary/10 via-accent/8 to-primary/6 floating-reverse absolute top-[38%] left-[18%] h-64 w-64 rounded-full opacity-38 blur-xl"
	></div>
	<div
		class="bg-gradient-conic from-accent/9 via-primary/7 to-accent/5 floating-gentle absolute right-[18%] bottom-[38%] h-56 w-56 rounded-full opacity-35 blur-xl"
	></div>

	<!-- COMPLEX GEOMETRIC PATTERNS SYSTEM -->
	<!-- Diamond Grid Networks -->
	<!-- <div
			class="absolute inset-0 opacity-[0.058]"
			style="background-image: linear-gradient(45deg, var(--primary) 1px, transparent 1px), linear-gradient(-45deg, var(--accent) 1px, transparent 1px); background-size: 40px 40px;"
		></div> -->
	<div
		class="absolute inset-0 opacity-[0.054]"
		style="background-image: linear-gradient(30deg, var(--accent) 2px, transparent 2px), linear-gradient(-30deg, var(--primary) 2px, transparent 2px); background-size: 60px 60px;"
	></div>
	<div
		class="absolute inset-0 opacity-[0.052]"
		style="background-image: linear-gradient(60deg, var(--primary) 1px, transparent 1px), linear-gradient(-60deg, var(--accent) 1px, transparent 1px); background-size: 80px 80px;"
	></div>

	<!-- Voronoi-like Cellular Pattern -->
	<div
		class="absolute inset-0 opacity-[0.006]"
		style="background-image: radial-gradient(ellipse at 25% 25%, var(--primary) 30%, transparent 70%), radial-gradient(ellipse at 75% 75%, var(--accent) 30%, transparent 70%), radial-gradient(ellipse at 25% 75%, var(--primary) 25%, transparent 75%), radial-gradient(ellipse at 75% 25%, var(--accent) 25%, transparent 75%); background-size: 200px 200px;"
	></div>

	<!-- GEOMETRIC ACCENT SHAPES SYSTEM -->
	<!-- Primary Complex Shapes -->
	<div
		class="from-primary/15 to-accent/10 floating absolute top-1/12 left-1/12 h-20 w-20 rotate-12 bg-gradient-to-br opacity-30"
		style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation-delay: -0.8s;"
	></div>
	<div
		class="from-accent/12 to-primary/8 floating-reverse absolute right-1/12 bottom-1/12 h-24 w-24 -rotate-18 bg-gradient-to-tl opacity-28"
		style="clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); animation-delay: -2.3s;"
	></div>
	<div
		class="from-primary/18 floating-gentle absolute top-1/4 right-1/12 h-16 w-16 rotate-45 bg-gradient-to-bl to-transparent opacity-32"
		style="clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); animation-delay: -1.5s;"
	></div>
	<div
		class="from-accent/14 floating-slow absolute bottom-1/4 left-1/12 h-22 w-22 -rotate-30 bg-gradient-to-tr to-transparent opacity-26"
		style="clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); animation-delay: -3.1s;"
	></div>

	<!-- Secondary Geometric Shapes -->
	<!-- <div
			class="from-primary/12 to-accent/8 floating-delayed absolute top-3/4 left-1/4 h-18 w-18 rotate-60 bg-gradient-to-r opacity-24"
			style="clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%); animation-delay: -4.2s;"
		></div>
		<div
			class="from-accent/10 to-primary/6 floating absolute right-1/4 bottom-3/4 h-28 w-28 -rotate-45 bg-gradient-to-l opacity-22"
			style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%); animation-delay: -0.7s;"
		></div>
		<div
			class="from-primary/16 floating-reverse absolute top-2/3 right-3/4 h-14 w-14 rotate-90 bg-gradient-to-t to-transparent opacity-28"
			style="clip-path: circle(50% at 50% 50%); animation-delay: -5.6s;"
		></div>
		<div
			class="from-accent/13 floating-gentle absolute bottom-2/3 left-3/4 h-26 w-26 -rotate-15 bg-gradient-to-b to-transparent opacity-25"
			style="clip-path: ellipse(50% 80% at 50% 50%); animation-delay: -2.9s;"
		></div> -->

	<!-- Tertiary Complex Shapes -->
	<div
		class="bg-gradient-conic from-primary/14 via-accent/10 to-primary/14 floating-slow absolute top-5/6 right-5/6 h-12 w-12 rotate-180 opacity-20"
		style="clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%); animation-delay: -6.4s;"
	></div>
	<div
		class="bg-gradient-conic from-accent/11 via-primary/8 to-accent/11 floating absolute bottom-5/6 left-5/6 h-16 w-16 -rotate-75 opacity-18"
		style="clip-path: polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%); animation-delay: -1.2s;"
	></div>

	<!-- ADDITIONAL DOT PATTERNS -->
	<!-- Orbital Dot Rings -->
	<!-- <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<div
				class="bg-primary/20 absolute top-[-100px] left-0 h-2 w-2 rounded-full opacity-45"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-accent/18 absolute top-[-70px] left-[70px] h-1.5 w-1.5 rounded-full opacity-48"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-primary/22 absolute top-0 left-[100px] h-2.5 w-2.5 rounded-full opacity-42"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-accent/16 absolute top-[70px] left-[70px] h-1 w-1 rounded-full opacity-50"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-primary/19 absolute top-[100px] left-0 h-2 w-2 rounded-full opacity-46"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-accent/21 absolute top-[70px] left-[-70px] h-1.5 w-1.5 rounded-full opacity-44"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-primary/24 absolute top-0 left-[-100px] h-3 w-3 rounded-full opacity-40"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
			<div
				class="bg-accent/17 absolute top-[-70px] left-[-70px] h-1 w-1 rounded-full opacity-52"
				style="animation: rotate-slow 60s linear infinite;"
			></div>
		</div> -->

	<!-- Counter-rotating Dot Ring -->
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<div
			class="bg-accent/15 absolute top-[-140px] left-0 h-1.5 w-1.5 rounded-full opacity-43"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-primary/18 absolute top-[-100px] left-[100px] h-2 w-2 rounded-full opacity-47"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-accent/14 absolute top-0 left-[140px] h-1 w-1 rounded-full opacity-41"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-primary/21 absolute top-[100px] left-[100px] h-2.5 w-2.5 rounded-full opacity-49"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-accent/19 absolute top-[140px] left-0 h-1.5 w-1.5 rounded-full opacity-39"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-primary/17 absolute top-[100px] left-[-100px] h-2 w-2 rounded-full opacity-51"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-accent/16 absolute top-0 left-[-140px] h-1 w-1 rounded-full opacity-37"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
		<div
			class="bg-primary/23 absolute top-[-100px] left-[-100px] h-3 w-3 rounded-full opacity-53"
			style="animation: rotate-slow 90s linear infinite reverse;"
		></div>
	</div>

	<!-- Floating Particle Ecosystem -->
	<!-- Primary Particles -->
	<!-- <div
			class="bg-primary/35 animate-pulse-slow floating absolute top-1/8 left-1/8 h-4 w-4 rounded-full"
			style="animation-delay: -0.5s;"
		></div>
		<div
			class="bg-accent/30 animate-pulse-slower floating-reverse absolute right-1/8 bottom-1/8 h-3 w-3 rounded-full"
			style="animation-delay: -2.5s;"
		></div> -->
	<div
		class="bg-primary/25 animate-pulse-slowest floating-gentle absolute top-3/8 right-1/5 h-2.5 w-2.5 rounded-full"
		style="animation-delay: -1.5s;"
	></div>
	<div
		class="bg-accent/28 animate-pulse-slow floating-slow absolute bottom-3/8 left-1/5 h-3.5 w-3.5 rounded-full"
		style="animation-delay: -3.5s;"
	></div>

	<!-- Secondary Particles -->
	<!-- <div
			class="bg-primary/22 animate-pulse-slower floating-delayed absolute top-5/8 left-2/5 h-2 w-2 rounded-full"
			style="animation-delay: -4s;"
		></div>
		<div
			class="bg-accent/26 animate-pulse-slowest floating-reverse absolute right-2/5 bottom-5/8 h-3 w-3 rounded-full"
			style="animation-delay: -1s;"
		></div> -->
	<div
		class="bg-primary/24 animate-pulse-slow floating-gentle absolute top-7/8 right-3/8 h-2.5 w-2.5 rounded-full"
		style="animation-delay: -2s;"
	></div>
	<div
		class="bg-accent/20 animate-pulse-slower floating absolute bottom-7/8 left-3/8 h-2 w-2 rounded-full"
		style="animation-delay: -3s;"
	></div>

	<!-- Tertiary Particles -->
	<!-- <div
			class="bg-primary/18 animate-pulse-slowest floating-slow absolute top-1/4 left-3/4 h-1.5 w-1.5 rounded-full"
			style="animation-delay: -5s;"
		></div>
		<div
			class="bg-accent/23 animate-pulse-slow floating-delayed absolute right-3/4 bottom-1/4 h-2.5 w-2.5 rounded-full"
			style="animation-delay: -0.8s;"
		></div> -->
	<div
		class="bg-primary/27 animate-pulse-slower floating-reverse absolute top-2/4 left-1/2 h-3 w-3 rounded-full"
		style="animation-delay: -4.2s;"
	></div>
	<div
		class="bg-accent/19 animate-pulse-slowest floating-gentle absolute right-1/2 bottom-2/4 h-2 w-2 rounded-full"
		style="animation-delay: -1.8s;"
	></div>

	<!-- Micro Particles -->
	<!-- <div
			class="bg-primary/15 animate-pulse-slow floating absolute top-1/6 left-5/6 h-1 w-1 rounded-full"
			style="animation-delay: -6s;"
		></div>
		<div
			class="bg-accent/17 animate-pulse-slower floating-reverse absolute right-5/6 bottom-1/6 h-1.5 w-1.5 rounded-full"
			style="animation-delay: -2.2s;"
		></div> -->
	<div
		class="bg-primary/14 animate-pulse-slowest floating-gentle absolute top-5/6 left-1/6 h-1 w-1 rounded-full"
		style="animation-delay: -3.7s;"
	></div>
	<div
		class="bg-accent/21 animate-pulse-slow floating-slow absolute right-1/6 bottom-5/6 h-2 w-2 rounded-full"
		style="animation-delay: -0.3s;"
	></div>
</div>