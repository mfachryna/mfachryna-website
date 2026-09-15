export const AVAILABLE_LOCALES = [
	{ code: 'en', label: 'EN', name: 'English', native: 'English', flag: '🇬🇧' },
	{ code: 'id', label: 'ID', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
	{ code: 'ja', label: 'JA', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
	{ code: 'ar', label: 'AR', name: 'Arabic', native: 'العربية', flag: '🇸🇦' }
] as const;

export type Locale = (typeof AVAILABLE_LOCALES)[number]['code'];

export const HERO_TYPEWRITER_TEXTS = [
	'A SOFTWARE ENGINEER',
	'A NOOB GAMER',
	'A GREAT WHITE SHARK',
	'A HOPELESS ROMANTIC MAN',
	'A LAG EXCUSE STRATEGIST',
	'A CURIOUS MONKEY',
	'A PROFESSIONAL SLEEPER',
	'A DARK MODE EVANGELIST',
	'A ROCK-SKIPPING SPEEDSTER',
	'A TRAIL-SEEKING ADVENTURER',
	'A MASTER OF CTRL+Z',
	'A SNOOZE BUTTON SCHOLAR'
] as const;

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
			typewriter: HERO_TYPEWRITER_TEXTS,
			tagline: "Passionate about crafting elegant solutions and building scalable systems. From backend APIs to system designs, I transform ideas into impactful digital products that make a difference in people's lives.",
			exploreWorks: 'Explore My Works',
			letsConnect: "Let's Connect",
			resume: 'Resume'
		},
		about: {
			badge: 'GET TO KNOW ME',
			title: 'About Me',
			lead: 'A passionate Software Engineer crafting mission-critical systems and scalable applications.',
			p1: "I am a Software Engineer based in Jakarta, Indonesia. Currently contributing as an IT Specialist at Bank Syariah Indonesia, focusing on building resilient payment solutions, core integration services, and developer acceleration engines.",
			p2: "My core expertise lies in backend architecture, microservices design, and modern web applications with Go, Kotlin Spring Boot, Laravel, Node.js, and TypeScript. I have a deep obsession with clean code, zero-trust security, and high-throughput low-latency systems.",
			p3: "Outside of writing code and designing system architectures, you can find me running on trails, exploring new coffee spots, or tinkering with open-source AI tooling and Obsidian knowledge graphs.",
			philosophy: 'I believe in building software that not only works but makes a difference. Every line of code is written with purpose, every system designed with the future in mind, and every solution crafted to drive real business value.',
			traits: [
				{ label: 'Problem Solver', icon: 'bullseye' },
				{ label: 'Growth-Oriented', icon: 'chart-line' },
				{ label: 'Strategic Thinker', icon: 'lightbulb' },
				{ label: 'Technology Agnostic', icon: 'tools' }
			],
			skillsTitle: 'Core Competencies',
			backend: 'Backend & Microservices',
			frontend: 'Modern Frontend & UI',
			database: 'Database & Caching',
			devops: 'Cloud & Infrastructure',
			cards: [
				{
					title: 'The Architect',
					icon: 'drafting-compass',
					description: "I design the blueprint for your software's success. My focus is on creating clean, scalable, and maintainable systems that stand the test of time and traffic. I build the strong foundation you need for future growth."
				},
				{
					title: 'The Pragmatist',
					icon: 'sliders-h',
					description: 'Technology is a toolbox, and I bring the whole set. I choose the right language, framework, and architecture for your specific challenge, ensuring practical, efficient solutions without being dogmatic about a single technology.'
				},
				{
					title: 'The Business Partner',
					icon: 'handshake',
					description: 'I sit at the intersection of code and commerce. I listen to your business needs and translate them into technical solutions that drive growth, improve efficiency, and deliver a measurable return on investment. Your goals become my technical roadmap.'
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
			viewAll: 'View All Articles',
			featured: 'Featured',
			latestInsights: 'Latest Insights',
			blogPosts: 'Blog Posts',
			blogDesc: 'Exploring ideas, sharing knowledge, and documenting my journey in software development.',
			showMore: 'Show More Posts',
			filterAll: 'All',
			backToAll: 'Back to all posts',
			published: 'Published',
			reading: 'Reading',
			topics: 'Topics',
			onThisPage: 'On this page',
			noContent: 'This post has no content yet.',
			checkBackSoon: 'Check back soon.'
		},
		contact: {
			badge: 'GET IN TOUCH',
			title: "Let's Work Together",
			subtitle: 'Have an interesting project, collaboration opportunity, or just want to chat tech? Drop me a message!',
			needsLabel: 'Needs',
			needsPlaceholder: 'Input or select your needs',
			needsOptions: ['Website', 'App', 'Design', 'Consultation'],
			noMatching: 'No matching options',
			nameLabel: 'Name',
			namePlaceholder: 'Input your name here',
			emailLabel: 'Email',
			emailPlaceholder: 'Input your email here',
			projectTypeLabel: 'Project Type',
			projectTypePlaceholder: 'Input or select project type',
			projectTypeOptions: ['Portfolio', 'Business Site', 'E-commerce', 'Other'],
			budgetLabel: 'Budget',
			budgetPlaceholder: 'Input or select budget',
			budgetOptions: ['< $1k', '$1k–$5k', '$5k–$10k', '$10k+'],
			descLabel: 'Description',
			descPlaceholder: 'Describe your project or any additional information',
			sendButton: 'Send Message',
			sending: 'Sending message...',
			successMessage: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
			errorMessage: 'Failed to send message. Please try again or reach out via email directly.',
			errors: {
				needs: 'Needs is required',
				name: 'Name is required',
				email: 'Email is required',
				emailValid: 'Please enter a valid email address',
				projectType: 'Project type is required',
				budget: 'Budget is required'
			}
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
			selectLanguage: 'Select Language',
			previous: 'Previous',
			next: 'Next',
			tryAgain: 'Try Again',
			technologies: 'Technologies & Skills',
			items: 'items',
			showing: 'Showing',
			of: 'of',
			projects: 'projects',
			articles: 'articles',
			portfolio: 'Portfolio'
		}
	},
	id: {
		nav: {
			about: 'Tentang',
			experiences: 'Pengalaman',
			works: 'Portofolio',
			blogs: 'Blog',
			contacts: 'Kontak'
		},
		hero: {
			welcome: 'Selamat datang',
			greeting: 'Halo, saya',
			name: 'Fachry',
			typewriter: HERO_TYPEWRITER_TEXTS,
			tagline: 'Fokus membangun solusi yang elegan dan sistem yang skalabel. Dari backend API hingga arsitektur sistem, saya mewujudkan ide menjadi produk digital yang berdampak nyata.',
			exploreWorks: 'Lihat Portofolio',
			letsConnect: 'Mari Terhubung',
			resume: 'Resume'
		},
		about: {
			badge: 'TENTANG SAYA',
			title: 'Tentang Saya',
			lead: 'Software Engineer yang fokus membangun sistem berskala besar dan aplikasi modern.',
			p1: "Saya Software Engineer yang berbasis di Jakarta, Indonesia. Saat ini berkontribusi di Bank Syariah Indonesia, berfokus mengembangkan solusi payment yang andal, integrasi core service, dan platform percepatan developer.",
			p2: "Fokus utama saya ada di arsitektur backend, desain microservices, dan pengembangan web modern dengan Go, Kotlin Spring Boot, Laravel, Node.js, dan TypeScript. Selalu mengutamakan clean code, keamanan zero-trust, serta sistem dengan throughput tinggi dan latensi rendah.",
			p3: "Di luar koding dan perancangan arsitektur sistem, saya biasanya lari trail, hunting kedai kopi baru, atau eksplorasi tooling AI open-source dan knowledge graph di Obsidian.",
			philosophy: 'Saya percaya dalam membangun software yang bukan sekadar berjalan, melainkan membawa dampak nyata. Setiap baris kode ditulis dengan tujuan, setiap sistem dirancang untuk masa depan, dan setiap solusi dibuat untuk memberikan nilai bisnis yang terukur.',
			traits: [
				{ label: 'Problem Solver', icon: 'bullseye' },
				{ label: 'Growth-Oriented', icon: 'chart-line' },
				{ label: 'Strategic Thinker', icon: 'lightbulb' },
				{ label: 'Technology Agnostic', icon: 'tools' }
			],
			skillsTitle: 'Keahlian Utama',
			backend: 'Backend & Microservices',
			frontend: 'Frontend Modern & UI',
			database: 'Database & Caching',
			devops: 'Cloud & Infrastruktur',
			cards: [
				{
					title: 'The Architect',
					icon: 'drafting-compass',
					description: 'Merancang fondasi arsitektur sistem yang bersih, terstruktur, dan skalabel untuk jangka panjang. Memastikan sistem siap menghadapi pertumbuhan traffic dan kebutuhan masa depan.'
				},
				{
					title: 'The Pragmatist',
					icon: 'sliders-h',
					description: 'Teknologi adalah sarana, bukan dogma. Memilih bahasa, framework, dan arsitektur yang paling tepat dan efisien untuk memecahkan masalah tanpa terpaku pada satu teknologi saja.'
				},
				{
					title: 'The Business Partner',
					icon: 'handshake',
					description: 'Menghubungkan kebutuhan bisnis dengan solusi teknis. Menerjemahkan objektif produk menjadi arsitektur dan sistem yang mendorong efisiensi dan pertumbuhan nyata.'
				}
			]
		},
		experience: {
			badge: 'JEJAK KARIER',
			title: 'Pengalaman Profesional',
			subtitle: 'Linimasa perjalanan karier profesional dan berbagai proyek seru yang pernah saya kerjakan.',
			present: 'Sekarang',
			achievements: 'Pencapaian Utama',
			readFull: 'Baca Selengkapnya',
			collapse: 'Tutup',
			noExperiences: 'Belum ada data pengalaman.',
			loadMore: 'Tampilkan Lebih Banyak',
			loading: 'Memuat...'
		},
		work: {
			badge: 'PORTOFOLIO',
			title: 'Proyek Pilihan',
			subtitle: 'Kumpulan platform enterprise, proyek open-source, dan aplikasi yang pernah saya kembangkan.',
			featured: 'Unggulan',
			liveDemo: 'Lihat Demo',
			github: 'Source Code',
			noProjects: 'Belum ada proyek yang ditemukan.',
			loadMore: 'Tampilkan Lebih Banyak Proyek'
		},
		blog: {
			badge: 'BLOG & TULISAN',
			title: 'Tulisan Terbaru',
			subtitle: 'Catatan dan pemikiran seputar distributed systems, AI engineering, arsitektur software, dan tech journey.',
			readPost: 'Baca Selengkapnya',
			minRead: 'menit baca',
			noBlogs: 'Belum ada tulisan yang dipublikasikan.',
			viewAll: 'Lihat Semua Tulisan',
			featured: 'Unggulan',
			latestInsights: 'Tulisan Terbaru',
			blogPosts: 'Postingan Blog',
			blogDesc: 'Berbagi ide, insight teknis, dan dokumentasi perjalanan di dunia software engineering.',
			showMore: 'Tampilkan Lebih Banyak',
			filterAll: 'Semua',
			backToAll: 'Kembali ke semua tulisan',
			published: 'Dipublikasikan',
			reading: 'Waktu Baca',
			topics: 'Topik',
			onThisPage: 'Di halaman ini',
			noContent: 'Belum ada konten untuk tulisan ini.',
			checkBackSoon: 'Cek lagi nanti ya.'
		},
		contact: {
			badge: 'KONTAK',
			title: 'Mari Terhubung',
			subtitle: 'Punya ide proyek seru, peluang kolaborasi, atau sekadar mau ngobrol santai seputar teknologi? Jangan ragu hubungi saya!',
			needsLabel: 'Kebutuhan',
			needsPlaceholder: 'Pilih atau tulis kebutuhan proyek',
			needsOptions: ['Website', 'Aplikasi Web/Mobile', 'UI/UX Design', 'Konsultasi Teknis'],
			noMatching: 'Opsi tidak ditemukan',
			nameLabel: 'Nama Lengkap',
			namePlaceholder: 'Masukkan nama Anda di sini',
			emailLabel: 'Email',
			emailPlaceholder: 'Masukkan alamat email Anda',
			projectTypeLabel: 'Tipe Proyek',
			projectTypePlaceholder: 'Pilih atau tulis tipe proyek',
			projectTypeOptions: ['Portofolio', 'Website Bisnis / Company Profile', 'E-commerce', 'Lainnya'],
			budgetLabel: 'Perkiraan Budget',
			budgetPlaceholder: 'Pilih rentang budget yang dialokasikan',
			budgetOptions: ['< $1k', '$1k–$5k', '$5k–$10k', '$10k+'],
			descLabel: 'Deskripsi Proyek',
			descPlaceholder: 'Ceritakan tentang kebutuhan proyek atau informasi tambahan lainnya...',
			sendButton: 'Kirim Pesan',
			sending: 'Mengirim...',
			successMessage: 'Pesan berhasil dikirim! Terima kasih sudah menghubungi, saya akan segera membalasnya.',
			errorMessage: 'Gagal mengirim pesan. Silakan coba lagi atau langsung email saya ya.',
			errors: {
				needs: 'Kebutuhan proyek wajib diisi',
				name: 'Nama wajib diisi',
				email: 'Email wajib diisi',
				emailValid: 'Format email tidak valid',
				projectType: 'Tipe proyek wajib diisi',
				budget: 'Budget wajib diisi'
			}
		},
		footer: {
			tagline: 'Dibuat dengan dedikasi oleh Muhammad Fachry Noorchoolish Arif.',
			rights: 'Hak cipta dilindungi.',
			backToTop: 'Kembali ke Atas'
		},
		common: {
			loading: 'Memuat...',
			error: 'Terjadi kesalahan',
			language: 'Bahasa',
			selectLanguage: 'Pilih Bahasa',
			previous: 'Sebelumnya',
			next: 'Selanjutnya',
			tryAgain: 'Coba Lagi',
			technologies: 'Teknologi & Tools',
			items: 'item',
			showing: 'Menampilkan',
			of: 'dari',
			projects: 'proyek',
			articles: 'artikel',
			portfolio: 'Portofolio'
		}
	},
	ja: {
		nav: {
			about: '自己紹介',
			experiences: '職歴・経歴',
			works: '開発実績',
			blogs: '記事',
			contacts: 'お問い合わせ'
		},
		hero: {
			welcome: 'ポートフォリオへようこそ',
			greeting: 'こんにちは、',
			name: 'ファフリです',
			typewriter: HERO_TYPEWRITER_TEXTS,
			tagline: 'エレガントなソリューションとスケーラブルなシステムの構築に情熱を注いでいます。バックエンドAPIからシステム設計まで、アイデアを価値あるデジタルプロダクトへと昇華させます。',
			exploreWorks: '実績を見る',
			letsConnect: 'お問い合わせ',
			resume: '職務経歴書'
		},
		about: {
			badge: '私について',
			title: '自己紹介',
			lead: '大規模ミッションクリティカルなシステムとモダンなWeb開発に情熱を注ぐソフトウェアエンジニア。',
			p1: "インドネシア・ジャカルタを拠点とするソフトウェアエンジニアです。現在はBank Syariah IndonesiaでITスペシャリストとして、高耐障害性の決済ソリューションや基幹連携サービス、開発生産性エンジンの開発に従事しています。",
			p2: "コアスキルはバックエンド設計、マイクロサービス、そしてGo、Kotlin Spring Boot、Laravel、Node.js、TypeScriptを用いたWeb開発です。クリーンコード、ゼロトラストセキュリティ、高スループット・低レイテンシの追求にこだわりを持っています。",
			p3: "コードを書くこと以外では、トレイルランニング、新しいカフェの開拓、オープンソースAIツールやObsidianのナレッジグラフの研究を楽しんでいます。",
			philosophy: '単に動くだけでなく、真の価値をもたらすソフトウェアの開発を信条としています。すべてのコードに目的を持ち、将来を見据えたシステム設計と、確実なビジネスインパクトを届けるソリューションを追求します。',
			traits: [
				{ label: '問題解決志向', icon: 'bullseye' },
				{ label: '成長志向', icon: 'chart-line' },
				{ label: '戦略的思考', icon: 'lightbulb' },
				{ label: '技術に柔軟', icon: 'tools' }
			],
			skillsTitle: '中核スキル',
			backend: 'バックエンド & マイクロサービス',
			frontend: 'モダンフロントエンド & UI',
			database: 'データベース & キャッシュ',
			devops: 'クラウド & インフラ',
			cards: [
				{
					title: 'The Architect',
					icon: 'drafting-compass',
					description: 'システムの成功に向けた堅牢な設計図を描きます。長期的なトラフィック増加に耐えうる、クリーンで拡張性の高いアーキテクチャを築きます。'
				},
				{
					title: 'The Pragmatist',
					icon: 'sliders-h',
					description: '技術は目的を達成するための道具です。特定の技術に固執せず、課題に応じて最適な言語・フレームワークを選定し、実用的かつ高効率な解決策を提供します。'
				},
				{
					title: 'The Business Partner',
					icon: 'handshake',
					description: 'ビジネスニーズを正確に理解し、技術的ソリューションへと翻訳します。投資対効果を最大化し、企業の継続的成長をエンジニアリングで支えます。'
				}
			]
		},
		experience: {
			badge: '職歴・経歴',
			title: '職歴・経歴',
			subtitle: 'エンジニアとしてのキャリアの歩みと、これまでに携わった主なプロジェクト。',
			present: '現在',
			achievements: '主な実績',
			readFull: 'ストーリーを読む',
			collapse: '閉じる',
			noExperiences: '経歴情報がありません。',
			loadMore: 'さらに表示',
			loading: '読み込み中...'
		},
		work: {
			badge: '開発実績',
			title: '主な開発実績',
			subtitle: 'エンタープライズプラットフォームやオープンソースなど、価値を創出したプロダクト群。',
			featured: '注目',
			liveDemo: 'ライブデモ',
			github: 'ソースコード',
			noProjects: 'プロジェクトが見つかりません。',
			loadMore: 'もっと見る'
		},
		blog: {
			badge: '記事・インサイト',
			title: '最新の記事',
			subtitle: '分散システム、AIエンジニアリング、システム設計、技術リーダーシップに関する知見。',
			readPost: '記事を読む',
			minRead: '分で読めます',
			noBlogs: 'まだ公開された記事はありません。',
			viewAll: 'すべての記事を見る',
			featured: '注目',
			latestInsights: '最新の記事',
			blogPosts: 'ブログ記事',
			blogDesc: 'アイデアを探求し、知識を共有し、ソフトウェア開発の歩みを記録する。',
			showMore: 'もっと見る',
			filterAll: 'すべて',
			backToAll: '記事一覧に戻る',
			published: '公開日',
			reading: '読了目安',
			topics: 'トピック',
			onThisPage: '目次',
			noContent: 'まだコンテンツがありません。',
			checkBackSoon: 'また見に来てください。'
		},
		contact: {
			badge: 'お問い合わせ',
			title: '一緒に創りましょう',
			subtitle: 'プロジェクトのご相談、協業のご提案、または技術についてのカジュアルな対話もお気軽にどうぞ！',
			needsLabel: 'ご要望',
			needsPlaceholder: 'ご要望を選択または入力してください',
			needsOptions: ['ウェブサイト', 'アプリケーション', 'UI/UXデザイン', '技術コンサルティング'],
			noMatching: '該当するオプションがありません',
			nameLabel: 'お名前',
			namePlaceholder: '山田 太郎',
			emailLabel: 'メールアドレス',
			emailPlaceholder: 'yamada@example.com',
			projectTypeLabel: 'プロジェクト種類',
			projectTypePlaceholder: '種類を選択または入力してください',
			projectTypeOptions: ['ポートフォリオ', '企業サイト', 'ECサイト', 'その他'],
			budgetLabel: 'ご予算目安',
			budgetPlaceholder: 'ご予算を選択してください',
			budgetOptions: ['< $1k', '$1k–$5k', '$5k–$10k', '$10k+'],
			descLabel: '詳細説明',
			descPlaceholder: 'プロジェクトの概要やスケジュールをご記入ください...',
			sendButton: '送信する',
			sending: '送信中...',
			successMessage: 'ありがとうございます。メッセージが送信されました。折り返しご連絡いたします。',
			errorMessage: '送信に失敗しました。時間をおいて再送いただくか、メールでご連絡ください。',
			errors: {
				needs: 'ご要望を入力してください',
				name: 'お名前を入力してください',
				email: 'メールアドレスを入力してください',
				emailValid: '有効なメールアドレスを入力してください',
				projectType: 'プロジェクト種類を選択してください',
				budget: 'ご予算を選択してください'
			}
		},
		footer: {
			tagline: 'Designed & Built by Muhammad Fachry Noorchoolish Arif.',
			rights: 'All rights reserved.',
			backToTop: 'トップへ戻る'
		},
		common: {
			loading: '読み込み中...',
			error: 'エラーが発生しました',
			language: '言語',
			selectLanguage: '言語を選択',
			previous: '前へ',
			next: '次へ',
			tryAgain: '再試行',
			technologies: '技術とスキル',
			items: '件',
			showing: '表示中:',
			of: '/',
			projects: '件のプロジェクト',
			articles: '件の記事',
			portfolio: 'ポートフォリオ'
		}
	},
	ar: {
		nav: {
			about: 'عنّي',
			experiences: 'الخبرات',
			works: 'الأعمال',
			blogs: 'المقالات',
			contacts: 'تواصل معي'
		},
		hero: {
			welcome: 'مرحباً بكم في عالمي',
			greeting: 'مرحباً، أنا',
			name: 'فخري',
			typewriter: HERO_TYPEWRITER_TEXTS,
			tagline: 'شغوف بابتكار حلول برمجية أنيقة وبناء أنظمة قابلة للتوسع، وتحويل الأفكار إلى منتجات رقمية ذات أثر حقيقي.',
			exploreWorks: 'استعرض أعمالي',
			letsConnect: 'تواصل معي',
			resume: 'السيرة الذاتية'
		},
		about: {
			badge: 'تعرف عليّ',
			title: 'نبذة عني',
			lead: 'مهندس برمجيات متفانٍ في بناء أنظمة مصيرية وتطبيقات قابلة للتوسع.',
			p1: "أنا مهندس برمجيات مقيم في جاكرتا، إندونيسيا. أساهم حالياً كأخصائي تقني في بنك الشريعة الإندونيسي، مركزاً على بناء حلول مدفوعات متينة، وخدمات التكامل الأساسية.",
			p2: "تتركز خبرتي الأساسية في معمارية الأنظمة الخلفية، وتصميم الخدمات المصغرة (Microservices) باستخدام Go وKotlin Spring Boot وLaravel وNode.js وTypeScript مع التزام بمعايير الأمان Zero-Trust والأداء العالي.",
			p3: "خارج نطاق البرمجة وتصميم النظم، أمارس رياضة الجري في المسارات الطبيعية، واستكشاف المقاهي، وتطوير أدوات الذكاء الاصطناعي مفتوحة المصدر.",
			philosophy: 'أؤمن ببناء برمجيات لا تكتفي بالعمل فحسب، بل تُحدث فارقاً حقيقياً. كل سطر برمجي يُكتب بهدف، وكل نظام يُصمم برؤية مستقبلية لصنع أثر ملموس.',
			traits: [
				{ label: 'مبتكر حلول', icon: 'bullseye' },
				{ label: 'شغوف بالتطور', icon: 'chart-line' },
				{ label: 'مفكر استراتيجي', icon: 'lightbulb' },
				{ label: 'مرن تقنياً', icon: 'tools' }
			],
			skillsTitle: 'الكفاءات الأساسية',
			backend: 'الأنظمة الخلفية والخدمات المصغرة',
			frontend: 'الواجهات الحديثة وتجربة المستخدم',
			database: 'قواعد البيانات والتخزين المؤقت',
			devops: 'السحابة والبنية التحتية',
			cards: [
				{
					title: 'المعماري',
					icon: 'drafting-compass',
					description: 'أصمم نماذج البيانات وواجهات البرمجة (APIs) التي يعتمد عليها النظام بأكمله لضمان الدقة عبر العقد الموزعة.'
				},
				{
					title: 'البراغماتي',
					icon: 'sliders-h',
					description: 'التقنية وسيلة وليست غاية. أستخدم Go وSpring Boot للمهام الحساسة، وLaravel وTypeScript للسرعة البرمجية.'
				},
				{
					title: 'الشريك الموثوق',
					icon: 'handshake',
					description: 'أحقق الأهداف بدقة متناهية، مع الحفاظ على أعلى معايير الجاهزية والتوثيق التقني الشامل.'
				}
			]
		},
		experience: {
			badge: 'مسيرتي المهنية',
			title: 'الخبرات المهنية',
			subtitle: 'تسلسل زمني لمسيرتي المهنية والمشاريع الكبرى التي ساهمت فيها.',
			present: 'الآن',
			achievements: 'أبرز الإنجازات',
			readFull: 'قراءة القصة كاملة',
			collapse: 'إغلاق',
			noExperiences: 'لا توجد خبرات مسجلة.',
			loadMore: 'تحميل المزيد',
			loading: 'جاري التحميل...'
		},
		work: {
			badge: 'معرض الأعمال',
			title: 'أبرز الأعمال والمشاريع',
			subtitle: 'مجموعة مختارة من المنصات المؤسسية والمشاريع المفتوحة المصدر عالية التأثير.',
			featured: 'مميز',
			liveDemo: 'معاينة حية',
			github: 'الكود المصدري',
			noProjects: 'لا توجد مشاريع.',
			loadMore: 'تحميل المزيد'
		},
		blog: {
			badge: 'المقالات والأفكار',
			title: 'أحدث التدوينات',
			subtitle: 'رؤى وأفكار حول النظم الموزعة، هندسة الذكاء الاصطناعي، وهندسة البرمجيات.',
			readPost: 'قراءة المقال',
			minRead: 'دقائق قراءة',
			noBlogs: 'لا توجد مقالات منشورة بعد.',
			viewAll: 'عرض جميع المقالات',
			featured: 'مميز',
			latestInsights: 'أحدث المقالات',
			blogPosts: 'تدوينات تقنية',
			blogDesc: 'استكشاف الأفكار، ومشاركة المعرفة، وتوثيق رحلتي في هندسة البرمجيات.',
			showMore: 'عرض المزيد',
			filterAll: 'الكل',
			backToAll: 'العودة لجميع المقالات',
			published: 'تاريخ النشر',
			reading: 'وقت القراءة',
			topics: 'الموضوعات',
			onThisPage: 'في هذه الصفحة',
			noContent: 'لا يوجد محتوى في هذا المقال بعد.',
			checkBackSoon: 'يرجى العودة قريباً.'
		},
		contact: {
			badge: 'تواصل معي',
			title: 'لنعمل معاً',
			subtitle: 'هل لديك مشروع شيق، فرصة تعاون، أو ترغب في الحديث تقنياً؟ راسلني الآن!',
			needsLabel: 'المتطلبات',
			needsPlaceholder: 'اختر أو اكتب متطلباتك',
			needsOptions: ['موقع إلكتروني', 'تطبيق ويب/موبايل', 'تصميم UI/UX', 'استشارة تقنية'],
			noMatching: 'لا توجد خيارات مطابقة',
			nameLabel: 'الاسم',
			namePlaceholder: 'محمد أحمد',
			emailLabel: 'البريد الإلكتروني',
			emailPlaceholder: 'mohammed@example.com',
			projectTypeLabel: 'نوع المشروع',
			projectTypePlaceholder: 'اختر أو اكتب نوع المشروع',
			projectTypeOptions: ['معرض أعمال', 'موقع تجاري / تعريفي', 'تجارة إلكترونية', 'أخرى'],
			budgetLabel: 'الميزانية المتوقعة',
			budgetPlaceholder: 'اختر نطاق الميزانية',
			budgetOptions: ['< $1k', '$1k–$5k', '$5k–$10k', '$10k+'],
			descLabel: 'تفاصيل المشروع',
			descPlaceholder: 'صف تفاصيل مشروعك أو أي متطلبات إضافية...',
			sendButton: 'إرسال الرسالة',
			sending: 'جاري الإرسال...',
			successMessage: 'شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك قريباً.',
			errorMessage: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى أو المراسلة عبر البريد مباشرة.',
			errors: {
				needs: 'المتطلبات مطلوبة',
				name: 'الاسم مطلوب',
				email: 'البريد الإلكتروني مطلوب',
				emailValid: 'يرجى إدخال بريد إلكتروني صالح',
				projectType: 'نوع المشروع مطلوب',
				budget: 'الميزانية مطلوبة'
			}
		},
		footer: {
			tagline: 'تصميم وتطوير محمد فخري نور خالص عارف.',
			rights: 'جميع الحقوق محفوظة.',
			backToTop: 'العودة إلى الأعلى'
		},
		common: {
			loading: 'جاري التحميل...',
			error: 'حدث خطأ ما',
			language: 'اللغة',
			selectLanguage: 'اختر اللغة',
			previous: 'السابق',
			next: 'التالي',
			tryAgain: 'إعادة المحاولة',
			technologies: 'التقنيات والمهارات',
			items: 'عناصر',
			showing: 'عرض',
			of: 'من',
			projects: 'مشاريع',
			articles: 'مقال',
			portfolio: 'معرض الأعمال'
		}
	}
} as const;

export type TranslationSchema = typeof translations.en;
