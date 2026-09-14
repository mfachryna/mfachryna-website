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
			selectLanguage: 'Select Language',
			previous: 'Previous',
			next: 'Next',
			tryAgain: 'Try again',
			technologies: 'Technologies & Skills',
			items: 'items',
			showing: 'Showing',
			of: 'of',
			projects: 'projects',
			portfolio: 'Portfolio'
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
			typewriter: HERO_TYPEWRITER_TEXTS,
			tagline: 'Berfokus membangun solusi elegan dan sistem yang skalabel. Dari backend API hingga arsitektur sistem, saya mewujudkan ide menjadi produk digital yang berdampak nyata.',
			exploreWorks: 'Lihat Karya Saya',
			letsConnect: 'Mari Terhubung',
			resume: 'Unduh CV'
		},
		about: {
			badge: 'MENGENAL LEBIH DEKAT',
			title: 'Tentang Saya',
			lead: 'Software Engineer yang berdedikasi membangun sistem berskala besar dan aplikasi modern.',
			p1: "Saya adalah Software Engineer yang berdomisili di Jakarta, Indonesia. Saat ini berkontribusi sebagai IT Specialist di Bank Syariah Indonesia, berfokus pada pengembangan solusi pembayaran yang tangguh, integrasi core service, dan platform akselerasi developer.",
			p2: "Keahlian utama saya mencakup arsitektur backend, desain microservices, dan aplikasi web modern menggunakan Go, Kotlin Spring Boot, Laravel, Node.js, dan TypeScript. Saya memiliki komitmen tinggi terhadap clean code, keamanan zero-trust, serta sistem dengan throughput tinggi dan latensi rendah.",
			p3: "Di luar koding dan merancang arsitektur sistem, saya gemar berlari trail, menjelajahi kedai kopi baru, atau mengeksplorasi tooling AI open-source dan context graph di Obsidian.",
			skillsTitle: 'Kompetensi Utama',
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
			viewAll: 'Lihat Semua Artikel',
			featured: 'Unggulan',
			latestInsights: 'Wawasan Terbaru',
			blogPosts: 'Artikel Blog',
			blogDesc: 'Mengeksplorasi ide, berbagi pengetahuan, dan mendokumentasikan perjalanan rekayasa perangkat lunak.',
			filterAll: 'Semua',
			backToAll: 'Kembali ke semua artikel',
			published: 'Dipublikasikan',
			reading: 'Waktu Baca',
			topics: 'Topik',
			onThisPage: 'Di halaman ini',
			noContent: 'Artikel ini belum memiliki konten.',
			checkBackSoon: 'Kunjungi kembali segera.'
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
			selectLanguage: 'Pilih Bahasa',
			previous: 'Sebelumnya',
			next: 'Selanjutnya',
			tryAgain: 'Coba lagi',
			technologies: 'Teknologi & Keahlian',
			items: 'item',
			showing: 'Menampilkan',
			of: 'dari',
			projects: 'proyek',
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
			badge: 'プロフィール',
			title: '私について',
			lead: 'ミッションクリティカルな大規模システムとモダンなWebアプリケーションを手がけるエンジニア。',
			p1: "インドネシア・ジャカルタを拠点とするソフトウェアエンジニアです。現在、バンク・シャリア・インドネシアにてITスペシャリストとして決済基盤、コア連携マイクロサービス、開発者アクセラレーション基盤の設計・開発に従事しています。",
			p2: "主な専門領域はバックエンドアーキテクチャ、マイクロサービス設計、およびGo、Kotlin Spring Boot、Laravel、Node.js、TypeScriptを用いたモダンWeb開発です。クリーンコード、ゼロトラストセキュリティ、高スループット・低レイテンシの追求に情熱を注いでいます。",
			p3: "コードを書くこと以外では、トレイルランニング、新しいカフェの開拓、OSSのAIツールやObsidianのナレッジグラフの研究を楽しんでいます。",
			skillsTitle: 'コアスキル',
			backend: 'バックエンド & マイクロサービス',
			frontend: 'モダンフロントエンド & UI',
			database: 'データベース & キャッシュ',
			devops: 'クラウド & インフラ',
			cards: [
				{
					title: 'アーキテクト',
					icon: 'drafting-compass',
					description: 'システム全体が依拠するデータモデルとAPI境界を設計。大規模システムにおいて、分散ノード間で整合性を保つ堅牢な土台を構築します。'
				},
				{
					title: 'プラグマティスト',
					icon: 'sliders-h',
					description: '技術は目的ではなくツールです。並行性と厳格な型安全性が求められる箇所にはGoやSpring Bootを、開発速度を優先する箇所にはLaravelやTypeScriptを選定します。'
				},
				{
					title: '信頼できるパートナー',
					icon: 'handshake',
					description: '納期と品質を両立し、確実なマイルストーン達成を実現。包括的な設計ドキュメントとシームレスな引き継ぎを提供します。'
				}
			]
		},
		experience: {
			badge: 'キャリア',
			title: '職務経歴',
			subtitle: 'これまでのエンジニアとしての歩みと参画した主要プロジェクト。',
			present: '現在',
			achievements: '主な成果',
			readFull: '詳細を見る',
			collapse: '閉じる',
			noExperiences: '経歴情報がありません。',
			loadMore: 'さらに読み込む',
			loading: '読み込み中...'
		},
		work: {
			badge: '実績',
			title: '注目のプロジェクト',
			subtitle: 'エンタープライズプラットフォーム、オープンソース、高負荷対応アプリケーションの抜粋。',
			featured: '注目',
			liveDemo: 'デモを見る',
			github: 'ソースコード',
			noProjects: 'プロジェクトがありません。',
			loadMore: 'さらにプロジェクトを見る'
		},
		blog: {
			badge: 'ナレッジ・記事',
			title: '最新の記事',
			subtitle: '分散システム、AIエンジニアリング、システム設計に関する技術的考察。',
			readPost: '記事を読む',
			minRead: '分で読めます',
			noBlogs: '記事がまだありません。',
			viewAll: 'すべての記事を見る',
			featured: '注目記事',
			latestInsights: '最新の知見',
			blogPosts: 'ブログ記事',
			blogDesc: 'アイデアを探求し、知識を共有し、ソフトウェア開発の軌跡を記録しています。',
			filterAll: 'すべて',
			backToAll: 'すべての記事に戻る',
			published: '公開日',
			reading: '読了時間',
			topics: 'トピック',
			onThisPage: '目次',
			noContent: 'この記事にはまだ本文がありません。',
			checkBackSoon: 'また見に来てください。'
		},
		contact: {
			badge: 'ご連絡',
			title: '一緒に開発しませんか',
			subtitle: 'プロジェクトのご相談、技術的な意見交換など、お気軽にお問い合わせください。',
			nameLabel: 'お名前',
			namePlaceholder: '山田 太郎',
			emailLabel: 'メールアドレス',
			emailPlaceholder: 'yamada@example.com',
			subjectLabel: '件名',
			subjectPlaceholder: '案件・協業について',
			messageLabel: 'メッセージ本文',
			messagePlaceholder: 'メッセージをご入力ください...',
			sendButton: '送信する',
			sending: '送信中...',
			successMessage: 'ありがとうございます。メッセージが送信されました。折り返しご連絡いたします。',
			errorMessage: '送信に失敗しました。時間をおいて再送いただくか、メールでご連絡ください。'
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
			loadMore: 'المزيد من المشاريع'
		},
		blog: {
			badge: 'المقالات والأفكار',
			title: 'أحدث المقالات',
			subtitle: 'أفكار حول الأنظمة الموزعة، وهندسة الذكاء الاصطناعي، والقيادة التقنية.',
			readPost: 'قراءة المقال',
			minRead: 'دقائق قراءة',
			noBlogs: 'لم يتم نشر مقالات بعد.',
			viewAll: 'جميع المقالات',
			featured: 'مميّز',
			latestInsights: 'أحدث الرؤى',
			blogPosts: 'مقالات المدونة',
			blogDesc: 'استكشاف الأفكار، ومشاركة المعرفة، وتوثيق مسيرتي في هندسة البرمجيات.',
			filterAll: 'الكل',
			backToAll: 'العودة إلى جميع المقالات',
			published: 'نُشر في',
			reading: 'وقت القراءة',
			topics: 'المواضيع',
			onThisPage: 'في هذه الصفحة',
			noContent: 'لا يوجد محتوى في هذا المقال بعد.',
			checkBackSoon: 'يرجى العودة قريباً.'
		},
		contact: {
			badge: 'تواصل معي',
			title: 'لنعمل معاً',
			subtitle: 'هل لديك مشروع شيق، فرصة تعاون، أو ترغب في الحديث تقنياً؟ راسلني الآن!',
			nameLabel: 'الاسم',
			namePlaceholder: 'محمد أحمد',
			emailLabel: 'البريد الإلكتروني',
			emailPlaceholder: 'mohammed@example.com',
			subjectLabel: 'الموضوع',
			subjectPlaceholder: 'استفسار / تعاون في مشروع',
			messageLabel: 'الرسالة',
			messagePlaceholder: 'مرحباً فخري، أود مناقشة...',
			sendButton: 'إرسال الرسالة',
			sending: 'جاري الإرسال...',
			successMessage: 'شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك قريباً.',
			errorMessage: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى أو المراسلة عبر البريد مباشرة.'
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
			portfolio: 'معرض الأعمال'
		}
	}
} as const;

export type TranslationSchema = typeof translations.en;
