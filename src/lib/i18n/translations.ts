export type Locale = 'en' | 'id';

export const translations = {
	en: {
		nav: {
			about: 'About',
			experiences: 'Experiences',
			works: 'Works',
			blogs: 'Blogs',
			contacts: 'Contacts'
		},
		hero: {
			welcome: 'Welcome to my world',
			greeting: "Hi, I'm",
			name: 'Fachry',
			typewriter: [
				'A SOFTWARE ENGINEER',
				'A BACKEND ARCHITECT',
				'A GO & LARAVEL SPECIALIST',
				'A DISTRIBUTED SYSTEMS ENTHUSIAST',
				'A PROBLEM SOLVER',
				'A DARK MODE EVANGELIST',
				'A TRAIL-SEEKING ADVENTURER',
				'A MASTER OF CTRL+Z',
				'A NOOB GAMER'
			],
			tagline: 'Crafting robust distributed backends, resilient system architectures, and high-performance applications that bridge enterprise scale with sharia-compliant banking technology.',
			exploreWorks: 'Explore My Works',
			letsConnect: "Let's Connect",
			resume: 'Resume'
		},
		about: {
			badge: 'GET TO KNOW ME',
			title: 'About Me',
			lead: 'A passionate Software Engineer crafting mission-critical systems and scalable applications.',
			p1: "I am a Software Engineer based in Jakarta, Indonesia. Currently, I am contributing as an IT Specialist at Bank Syariah Indonesia, focusing on building resilient payment solutions, core integration services, and developer acceleration engines.",
			p2: "My core expertise lies in backend architecture, microservices design, and modern web applications with Go, Kotlin Spring Boot, Laravel, Node.js, and TypeScript. I have a deep obsession with clean code, zero-trust security, and high-throughput low-latency systems.",
			p3: "Outside of writing code and designing system architectures, you can find me running on trails, exploring new coffee spots, or tinkering with open-source AI tooling and Obsidian knowledge graphs.",
			skillsTitle: 'Core Competencies',
			backend: 'Backend & Microservices',
			frontend: 'Modern Frontend & UI',
			database: 'Database & Caching',
			devops: 'Cloud & Infrastructure',
			cards: [
				{
					title: 'The Architect',
					icon: 'drafting-compass',
					description: 'I design data models and APIs the rest of the system leans on. On enterprise platforms, that means schemas and service boundaries that stay correct across distributed nodes — the foundation you only notice when missing.'
				},
				{
					title: 'The Pragmatist',
					icon: 'sliders-h',
					description: 'Technology is a toolbox, not a dogma. Go and Spring Boot where concurrency and strict typing matter; Laravel or TypeScript where product agility is king. The right choice is what your team can easily operate.'
				},
				{
					title: 'The Reliable Partner',
					icon: 'handshake',
					description: 'I deliver mission-critical milestones with precision. Managing parallel initiatives, maintaining high SLA uptime, and providing comprehensive documentation and architecture handovers.'
				}
			]
		},
		experience: {
			badge: 'MY JOURNEY',
			title: 'Professional Experience',
			subtitle: 'A timeline of my professional growth and the exciting projects I have contributed to.',
			present: 'Present',
			achievements: 'Key Achievements',
			readFull: 'Read Full Story',
			collapse: 'Collapse',
			noExperiences: 'No experiences found.',
			loadMore: 'Load More Experiences',
			loading: 'Loading...'
		},
		work: {
			badge: 'PORTFOLIO',
			title: 'Featured Works & Projects',
			subtitle: 'A selection of enterprise platforms, open-source projects, and high-impact applications.',
			featured: 'Featured',
			liveDemo: 'Live Demo',
			github: 'Source Code',
			noProjects: 'No projects found.',
			loadMore: 'Load More Projects'
		},
		blog: {
			badge: 'INSIGHTS & ARTICLES',
			title: 'Latest Writings',
			subtitle: 'Thoughts on distributed systems, AI engineering, system architecture, and tech leadership.',
			readPost: 'Read Article',
			minRead: 'min read',
			noBlogs: 'No articles published yet.',
			viewAll: 'View All Articles'
		},
		contact: {
			badge: 'GET IN TOUCH',
			title: "Let's Work Together",
			subtitle: 'Have an interesting project, collaboration opportunity, or just want to chat tech? Drop me a message!',
			nameLabel: 'Your Name',
			namePlaceholder: 'John Doe',
			emailLabel: 'Email Address',
			emailPlaceholder: 'john@example.com',
			subjectLabel: 'Subject',
			subjectPlaceholder: 'Project Collaboration / Inquiry',
			messageLabel: 'Message',
			messagePlaceholder: 'Hi Fachry, I would like to discuss...',
			sendButton: 'Send Message',
			sending: 'Sending message...',
			successMessage: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
			errorMessage: 'Failed to send message. Please try again or reach out via email directly.'
		},
		footer: {
			tagline: 'Designed & Built by Muhammad Fachry Noorchoolish Arif.',
			rights: 'All rights reserved.',
			backToTop: 'Back to Top'
		},
		common: {
			loading: 'Loading...',
			error: 'Something went wrong',
			language: 'Language',
			en: 'English',
			id: 'Indonesia'
		}
	},
	id: {
		nav: {
			about: 'Tentang',
			experiences: 'Pengalaman',
			works: 'Portofolio',
			blogs: 'Artikel',
			contacts: 'Kontak'
		},
		hero: {
			welcome: 'Selamat datang di dunia saya',
			greeting: 'Halo, saya',
			name: 'Fachry',
			typewriter: [
				'SOFTWARE ENGINEER',
				'ARSITEK BACKEND',
				'SPESIALIS GO & LARAVEL',
				'PENGGEMAR DISTRIBUTED SYSTEMS',
				'PROBLEM SOLVER',
				'PENIKMAT DARK MODE',
				'PELARI & PETUALANG',
				'PAKAR CTRL+Z',
				'GAMER PEMULA'
			],
			tagline: 'Merancang backend terdistribusi yang tangguh, arsitektur sistem berkinerja tinggi, dan solusi enterprise yang mengintegrasikan skala perbankan syariah modern.',
			exploreWorks: 'Lihat Karya Saya',
			letsConnect: 'Mari Terhubung',
			resume: 'Unduh CV'
		},
		about: {
			badge: 'MENGENAL LEBIH DEKAT',
			title: 'Tentang Saya',
			lead: 'Software Engineer yang berdedikasi membangun sistem berskala besar dan aplikasi modern.',
			p1: "Saya adalah Software Engineer yang berdomisili di Jakarta, Indonesia. Saat ini, saya berkontribusi sebagai IT Specialist di Bank Syariah Indonesia, berfokus pada pengembangan solusi pembayaran yang tangguh, integrasi core service, dan platform akselerasi developer.",
			p2: "Keahlian utama saya mencakup arsitektur backend, desain microservices, dan aplikasi web modern menggunakan Go, Kotlin Spring Boot, Laravel, Node.js, dan TypeScript. Saya memiliki komitmen tinggi terhadap clean code, keamanan zero-trust, serta sistem dengan throughput tinggi dan latensi rendah.",
			p3: "Di luar koding dan merancang arsitektur sistem, saya gemar berlari trail, menjelajahi kedai kopi baru, atau mengeksplorasi tooling AI open-source dan context graph di Obsidian.",
			skillsTitle: 'Kompetensi Utama',
			backend: 'Backend & Microservices',
			frontend: 'Frontend Modern & UI',
			database: 'Database & Caching',
			devops: 'Cloud & Infrastruktur',
			cards: [
				{
					title: 'Sang Arsitek',
					icon: 'drafting-compass',
					description: 'Saya merancang model data dan API yang menjadi pondasi sistem. Pada platform enterprise, ini berarti skema dan batasan service yang tetap presisi di berbagai node — pondasi kokoh yang baru disadari saat hilang.'
				},
				{
					title: 'Sang Pragmatis',
					icon: 'sliders-h',
					description: 'Teknologi adalah alat, bukan dogma. Menggunakan Go dan Spring Boot saat konkurensi dan tipe data ketat dibutuhkan; Laravel atau TypeScript untuk kecepatan iterasi produk. Pilihan tepat adalah sistem yang mudah dikelola tim.'
				},
				{
					title: 'Mitra Terpercaya',
					icon: 'handshake',
					description: 'Saya menyelesaikan milestone proyek dengan presisi. Mengelola inisiatif paralel, menjaga SLA uptime yang tinggi, serta menyiapkan dokumentasi teknis dan proses handover yang menyeluruh.'
				}
			]
		},
		experience: {
			badge: 'PERJALANAN KARIER',
			title: 'Pengalaman Profesional',
			subtitle: 'Linimasa pertumbuhan karier profesional dan proyek-proyek penting yang telah saya kerjakan.',
			present: 'Sekarang',
			achievements: 'Pencapaian Utama',
			readFull: 'Baca Kisah Lengkap',
			collapse: 'Tutup',
			noExperiences: 'Belum ada pengalaman yang ditemukan.',
			loadMore: 'Muat Lebih Banyak Pengalaman',
			loading: 'Memuat...'
		},
		work: {
			badge: 'PORTOFOLIO',
			title: 'Karya & Proyek Unggulan',
			subtitle: 'Pilihan platform enterprise, proyek open-source, dan aplikasi dengan dampak nyata.',
			featured: 'Unggulan',
			liveDemo: 'Lihat Demo',
			github: 'Kode Sumber',
			noProjects: 'Belum ada proyek yang ditemukan.',
			loadMore: 'Muat Lebih Banyak Proyek'
		},
		blog: {
			badge: 'WAWASAN & ARTIKEL',
			title: 'Artikel Terbaru',
			subtitle: 'Pemikiran seputar distributed systems, AI engineering, arsitektur software, dan kepemimpinan teknis.',
			readPost: 'Baca Artikel',
			minRead: 'mnt baca',
			noBlogs: 'Belum ada artikel yang diterbitkan.',
			viewAll: 'Lihat Semua Artikel'
		},
		contact: {
			badge: 'HUBUNGI SAYA',
			title: 'Mari Berkolaborasi',
			subtitle: 'Punya ide proyek menarik, peluang kerja sama, atau sekadar ingin berbincang seputar teknologi? Kirimkan pesan Anda!',
			nameLabel: 'Nama Anda',
			namePlaceholder: 'Nama Lengkap',
			emailLabel: 'Alamat Email',
			emailPlaceholder: 'nama@email.com',
			subjectLabel: 'Subjek',
			subjectPlaceholder: 'Kolaborasi Proyek / Pertanyaan',
			messageLabel: 'Pesan',
			messagePlaceholder: 'Halo Fachry, saya ingin berdiskusi mengenai...',
			sendButton: 'Kirim Pesan',
			sending: 'Mengirim pesan...',
			successMessage: 'Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan segera merespons Anda.',
			errorMessage: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi lewat email langsung.'
		},
		footer: {
			tagline: 'Didesain & Dibangun oleh Muhammad Fachry Noorchoolish Arif.',
			rights: 'Hak cipta dilindungi undang-undang.',
			backToTop: 'Kembali ke Atas'
		},
		common: {
			loading: 'Memuat...',
			error: 'Terjadi kesalahan',
			language: 'Bahasa',
			en: 'English',
			id: 'Indonesia'
		}
	}
} as const;

export type TranslationSchema = typeof translations.en;
