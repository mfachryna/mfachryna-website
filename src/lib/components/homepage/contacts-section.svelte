<script lang="ts">
	import toast from 'svelte-french-toast';
	import PageTitle from '../page-title.svelte';
	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';

	import type { ToastPosition } from 'svelte-french-toast';
	import AnimateOnScroll from '../animate-on-scroll.svelte';
	interface ToastOptions {
		duration?: number;
		position?: ToastPosition;
		style?: string;
		icon?: string;
		iconTheme?: {
			primary: string;
			secondary: string;
		};
	}

	function showSuccessToast(message: string) {
		const options: ToastOptions = {
			duration: 6000,
			position: 'top-center',
			style: 'border-radius: 8px;'
		};
		toast.success(message, options);
	}

	const contactSchema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Muhammad Fachry Noorchoolish Arif',
		description:
			'Contact form to get in touch with Muhammad Fachry Noorchoolish Arif for project inquiries',
		mainEntity: {
			'@type': 'Person',
			name: 'Muhammad Fachry Noorchoolish Arif',
			jobTitle: 'Software Engineer',
			email: 'contact@fachry.dev'
		}
	};

	let form = {
		needs: '',
		name: '',
		email: '',
		projectType: '',
		budget: '',
		additional: ''
	};

	const needsOptions = ['Website', 'App', 'Design', 'Consultation'];
	const projectTypes = ['Portfolio', 'Business Site', 'E-commerce', 'Other'];
	const budgets = ['< $1k', '$1k–$5k', '$5k–$10k', '$10k+'];

	let isNeedsOpen = false;
	let isProjectTypeOpen = false;
	let isBudgetOpen = false;

	$: filteredNeeds = form.needs
		? needsOptions.filter((option) => option.toLowerCase().includes(form.needs.toLowerCase()))
		: needsOptions;

	$: filteredProjectTypes = form.projectType
		? projectTypes.filter((option) => option.toLowerCase().includes(form.projectType.toLowerCase()))
		: projectTypes;

	$: filteredBudgets = form.budget
		? budgets.filter((option) => option.toLowerCase().includes(form.budget.toLowerCase()))
		: budgets;

	function setupClickOutside() {
		function handleClickOutside(event: MouseEvent) {
			const needsCombobox = document.getElementById('needs-combobox');
			const projectTypeCombobox = document.getElementById('projectType-combobox');
			const budgetCombobox = document.getElementById('budget-combobox');

			if (needsCombobox && !needsCombobox.contains(event.target as Node)) {
				isNeedsOpen = false;
			}

			if (projectTypeCombobox && !projectTypeCombobox.contains(event.target as Node)) {
				isProjectTypeOpen = false;
			}

			if (budgetCombobox && !budgetCombobox.contains(event.target as Node)) {
				isBudgetOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);

		return {
			destroy() {
				document.removeEventListener('click', handleClickOutside);
			}
		};
	}

	function selectOption(field: keyof typeof form, value: string) {
		form[field] = value;

		if (field === 'needs') isNeedsOpen = false;
		if (field === 'projectType') isProjectTypeOpen = false;
		if (field === 'budget') isBudgetOpen = false;
	}

	let isSubmitting = false;
	let formErrors: Record<string, string> = {};

	function validateForm() {
		formErrors = {};
		let isValid = true;

		if (!form.needs) {
			formErrors.needs = 'Please select your needs';
			isValid = false;
		}

		if (!form.name) {
			formErrors.name = 'Name is required';
			isValid = false;
		}

		if (!form.email) {
			formErrors.email = 'Email is required';
			isValid = false;
		} else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
			formErrors.email = 'Please enter a valid email';
			isValid = false;
		}

		if (!form.projectType) {
			formErrors.projectType = 'Please select project type';
			isValid = false;
		}

		if (!form.budget) {
			formErrors.budget = 'Please select budget';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			const result = await response.json();

			if (result.success) {
				form = {
					needs: '',
					name: '',
					email: '',
					projectType: '',
					budget: '',
					additional: ''
				};

				toast.success("Thank you! Your message has been sent successfully. I'll be in touch soon.");
			} else {
				toast.error(result.message || 'There was an error submitting the form. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('There was a network error. Please try again or contact me directly.');
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		const cleanup = setupClickOutside();

		return () => {
			cleanup.destroy();
		};
	});
</script>

<svelte:head>
	<script type="application/ld+json">
{JSON.stringify(contactSchema)}
	</script>
</svelte:head>

<section class="section-padding relative" id="contacts" aria-labelledby="contacts-title">
	<div class="container-modern relative z-10">
		<PageTitle
			brief="Let's Work Together"
			title="Contact Me"
			description="Ready to bring your ideas to life? Let's discuss your project and create something amazing
				together."
		/>
		<AnimateOnScroll
			animation="zoom-in"
			delay={200}
			threshold={0.1}
			className="max-w-4xl radius-xl mx-auto backdrop-blur-sm"
		>
			<div class="card-modern bg-background/60 mx-auto max-w-4xl">
				<form
					class="space-y-8 text-sm md:text-base"
					onsubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					novalidate
				>
					<div id="needs-combobox" class="relative text-sm">
						<label for="needs" class="mb-1 block font-medium">
							<span class="text-sm text-red-500">*</span> Needs
						</label>
						<div class="relative">
							<button
								type="button"
								class="border-border bg-input text-foreground flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-2 text-left"
								class:border-red-500={formErrors.needs}
								onclick={(e) => {
									e.stopPropagation;
									isNeedsOpen = !isNeedsOpen;
								}}
								aria-expanded={isNeedsOpen}
								aria-haspopup="listbox"
								aria-label={isNeedsOpen ? 'Close needs options' : 'Open needs options'}
							>
								<input
									id="needs"
									type="text"
									placeholder="Input or select your needs"
									bind:value={form.needs}
									onfocus={() => (isNeedsOpen = true)}
									oninput={() => (isNeedsOpen = true)}
									onclick={(e) => {
										e.stopPropagation;
									}}
									onkeydown={(e) => {
										if (e.key === 'Escape') {
											isNeedsOpen = false;
										} else if (e.key === 'ArrowDown' && !isNeedsOpen) {
											isNeedsOpen = true;
										}
									}}
									class="w-full border-none bg-transparent outline-none focus:ring-0"
									role="combobox"
									aria-expanded={isNeedsOpen}
									aria-autocomplete="list"
									aria-controls="needs-listbox"
									aria-invalid={!!formErrors.needs}
									aria-describedby={formErrors.needs ? 'needs-error' : undefined}
								/>
								<span
									class="ml-2 flex-shrink-0 text-gray-400 focus:outline-none"
									aria-hidden="true"
								>
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										></path>
									</svg>
								</span>
							</button>

							{#if isNeedsOpen}
								<ul
									id="needs-listbox"
									class="bg-input border-border/20 absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border shadow-lg"
									role="listbox"
								>
									{#if filteredNeeds.length === 0}
										<li class="px-4 py-2 text-gray-500 italic">No matching options</li>
									{:else}
										{#each filteredNeeds as option, i}
											<li
												class="hover:bg-foreground/10 cursor-pointer px-4 py-2"
												role="option"
												tabindex="0"
												onclick={() => selectOption('needs', option)}
												onkeydown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.preventDefault();
														selectOption('needs', option);
													}
												}}
												aria-selected={form.needs === option}
											>
												{option}
											</li>
										{/each}
									{/if}
								</ul>
							{/if}
						</div>
						{#if formErrors.needs}
							<p id="needs-error" class="mt-1 text-red-500">{formErrors.needs}</p>
						{/if}
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label for="name" class="mb-1 block font-medium">
								<span class="text-red-500">*</span> Name
							</label>
							<input
								id="name"
								type="text"
								placeholder="Input Your name here"
								bind:value={form.name}
								class="border-border bg-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-4 py-2"
								class:border-red-500={formErrors.name}
								aria-invalid={!!formErrors.name}
								aria-describedby={formErrors.name ? 'name-error' : undefined}
							/>
							{#if formErrors.name}
								<p id="name-error" class="mt-1 text-red-500">{formErrors.name}</p>
							{/if}
						</div>

						<div>
							<label for="email" class="mb-1 block font-medium">
								<span class="text-red-500">*</span> Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Input Your email here"
								bind:value={form.email}
								class="border-border bg-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-4 py-2"
								class:border-red-500={formErrors.email}
								aria-invalid={!!formErrors.email}
								aria-describedby={formErrors.email ? 'email-error' : undefined}
							/>
							{#if formErrors.email}
								<p id="email-error" class="mt-1 text-red-500">{formErrors.email}</p>
							{/if}
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div id="projectType-combobox" class="relative">
							<label for="project" class="mb-1 block font-medium">
								<span class="text-red-500">*</span> Project Type
							</label>
							<div class="relative">
								<button
									type="button"
									class="border-border bg-input text-foreground flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-2 text-left"
									class:border-red-500={formErrors.projectType}
									onclick={(e) => {
										e.stopPropagation;
										isProjectTypeOpen = !isProjectTypeOpen;
									}}
									aria-expanded={isProjectTypeOpen}
									aria-haspopup="listbox"
									aria-label={isProjectTypeOpen
										? 'Close project type options'
										: 'Open project type options'}
								>
									<input
										id="project"
										type="text"
										placeholder="Input or select project type"
										bind:value={form.projectType}
										onfocus={() => (isProjectTypeOpen = true)}
										oninput={() => (isProjectTypeOpen = true)}
										onclick={(e) => {
											e.stopPropagation;
										}}
										onkeydown={(e) => {
											if (e.key === 'Escape') {
												isProjectTypeOpen = false;
											} else if (e.key === 'ArrowDown' && !isProjectTypeOpen) {
												isProjectTypeOpen = true;
											}
										}}
										class="w-full border-none bg-transparent outline-none focus:ring-0"
										role="combobox"
										aria-expanded={isProjectTypeOpen}
										aria-autocomplete="list"
										aria-controls="projectType-listbox"
										aria-invalid={!!formErrors.projectType}
										aria-describedby={formErrors.projectType ? 'project-error' : undefined}
									/>
									<span
										class="ml-2 flex-shrink-0 text-gray-400 focus:outline-none"
										aria-hidden="true"
									>
										<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											></path>
										</svg>
									</span>
								</button>

								{#if isProjectTypeOpen}
									<ul
										id="projectType-listbox"
										class="bg-input border-border/20 absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border shadow-lg"
										role="listbox"
									>
										{#if filteredProjectTypes.length === 0}
											<li class="px-4 py-2 text-gray-500 italic">No matching options</li>
										{:else}
											{#each filteredProjectTypes as option, i}
												<li
													class="hover:bg-foreground/10 cursor-pointer px-4 py-2"
													role="option"
													tabindex="0"
													onclick={() => selectOption('projectType', option)}
													onkeydown={(e) => {
														if (e.key === 'Enter' || e.key === ' ') {
															e.preventDefault();
															selectOption('projectType', option);
														}
													}}
													aria-selected={form.projectType === option}
												>
													{option}
												</li>
											{/each}
										{/if}
									</ul>
								{/if}
							</div>
							{#if formErrors.projectType}
								<p id="project-error" class="mt-1 text-red-500">{formErrors.projectType}</p>
							{/if}
						</div>

						<div id="budget-combobox" class="relative">
							<label for="budget" class="mb-1 block font-medium">
								<span class="text-red-500">*</span> Budget
							</label>
							<div class="relative">
								<button
									type="button"
									class="border-border bg-input text-foreground flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-2 text-left"
									class:border-red-500={formErrors.budget}
									onclick={(e) => {
										e.stopPropagation;
										isBudgetOpen = !isBudgetOpen;
									}}
									aria-expanded={isBudgetOpen}
									aria-haspopup="listbox"
									aria-label={isBudgetOpen ? 'Close budget options' : 'Open budget options'}
								>
									<input
										id="budget"
										type="text"
										placeholder="Input or select budget"
										bind:value={form.budget}
										onfocus={() => (isBudgetOpen = true)}
										oninput={() => (isBudgetOpen = true)}
										onclick={(e) => {
											e.stopPropagation;
										}}
										onkeydown={(e) => {
											if (e.key === 'Escape') {
												isBudgetOpen = false;
											} else if (e.key === 'ArrowDown' && !isBudgetOpen) {
												isBudgetOpen = true;
											}
										}}
										class="w-full border-none bg-transparent outline-none focus:ring-0"
										role="combobox"
										aria-expanded={isBudgetOpen}
										aria-autocomplete="list"
										aria-controls="budget-listbox"
										aria-invalid={!!formErrors.budget}
										aria-describedby={formErrors.budget ? 'budget-error' : undefined}
									/>
									<span
										class="ml-2 flex-shrink-0 text-gray-400 focus:outline-none"
										aria-hidden="true"
									>
										<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											></path>
										</svg>
									</span>
								</button>

								{#if isBudgetOpen}
									<ul
										id="budget-listbox"
										class="bg-input border-border/20 absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border shadow-lg"
										role="listbox"
									>
										{#if filteredBudgets.length === 0}
											<li class="px-4 py-2 text-gray-500 italic">No matching options</li>
										{:else}
											{#each filteredBudgets as option, i}
												<li
													class="hover:bg-foreground/10 cursor-pointer px-4 py-2"
													role="option"
													tabindex="0"
													onclick={() => selectOption('budget', option)}
													onkeydown={(e) => {
														if (e.key === 'Enter' || e.key === ' ') {
															e.preventDefault();
															selectOption('budget', option);
														}
													}}
													aria-selected={form.budget === option}
												>
													{option}
												</li>
											{/each}
										{/if}
									</ul>
								{/if}
							</div>
							{#if formErrors.budget}
								<p id="budget-error" class="mt-1 text-red-500">{formErrors.budget}</p>
							{/if}
						</div>
					</div>

					<div>
						<label for="additional" class="mb-1 block font-medium">Description</label>
						<textarea
							id="description"
							rows="5"
							placeholder="Describe your project or any additional information"
							bind:value={form.additional}
							class="border-border bg-input text-foreground placeholder:text-muted-foreground w-full rounded-md border px-4 py-2"
						></textarea>
					</div>

					<div class="pt-4 text-center">
						<Button variant="default" size="lg" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</form>
			</div></AnimateOnScroll
		>
	</div>
</section>

<style>
	:global(input:focus),
	:global(select:focus),
	:global(textarea:focus) {
		outline: 2px solid #6c8cb8;
		outline-offset: 2px;
	}

	input[role='combobox']:focus {
		outline: none;
	}

	form {
		contain: content;
	}
</style>
