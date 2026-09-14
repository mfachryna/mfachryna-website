import type { Locale } from './translations';
import type { ExperienceWithTags } from '$lib/types/experience';
import type { ProjectWithTags } from '$lib/types/project';

/**
 * Universal content localization engine for dynamic CMS / PostgreSQL entities.
 * 
 * Handles:
 * 1. Inline multilingual delimiter blocks in Markdown/HTML (e.g. `<!-- lang:id -->...<!-- /lang:id -->`)
 * 2. JSON-formatted multilingual strings (`{"en":"...","id":"..."}`)
 * 3. Curated overrides for existing experience and project records in the database
 * 4. Graceful fallback to default/English content
 */

/** Parse text that contains `<!-- lang:xx -->...<!-- /lang:xx -->` tags or JSON */
export function localizeText(rawText: string | null | undefined, locale: Locale): string {
	if (!rawText) return '';

	// 1. Check for HTML comment delimiter blocks: <!-- lang:id -->content<!-- /lang:id -->
	const delimiterRegex = new RegExp(`<!--\\s*lang:${locale}\\s*-->([\\s\\S]*?)<!--\\s*\\/lang:${locale}\\s*-->`, 'i');
	const match = rawText.match(delimiterRegex);
	if (match && match[1]?.trim()) {
		return match[1].trim();
	}

	// Delimiter fallback: if requested locale not found, try English block
	if (locale !== 'en') {
		const enMatch = rawText.match(/<!--\s*lang:en\s*-->([\s\S]*?)<!--\s*\/lang:en\s*-->/i);
		if (enMatch && enMatch[1]?.trim()) {
			return enMatch[1].trim();
		}
	}

	// Strip remaining delimiter tags if present in standard content
	if (/<!--\s*lang:[a-z]{2}\s*-->/i.test(rawText)) {
		// If delimiters exist but none matched, extract first available or clean it
		const clean = rawText.replace(/<!--\s*\/?lang:[a-z]{2}\s*-->/gi, '').trim();
		if (clean) return clean;
	}

	// 2. Check for JSON serialized multilingual dictionary
	if (rawText.startsWith('{') && rawText.endsWith('}')) {
		try {
			const parsed = JSON.parse(rawText);
			if (typeof parsed === 'object' && parsed !== null) {
				if (parsed[locale]) return parsed[locale];
				if (parsed.en) return parsed.en;
			}
		} catch {
			// Not valid JSON, continue with raw text
		}
	}

	return rawText;
}

/** Formats date according to active locale */
export function localizeDate(date: string | Date | null | undefined, locale: Locale): string {
	if (!date) return '';
	const d = new Date(date);
	if (isNaN(d.getTime())) return '';

	const localeMap: Record<Locale, string> = {
		en: 'en-US',
		id: 'id-ID',
		ja: 'ja-JP',
		ar: 'ar-SA'
	};

	return d.toLocaleDateString(localeMap[locale] || 'en-US', {
		year: 'numeric',
		month: 'short'
	});
}

/** Curated translation records for Fachry's career experiences */
const EXPERIENCE_TRANSLATIONS: Record<
	string,
	Partial<Record<Locale, {
		title?: string;
		role?: string;
		description?: string;
		content?: string;
		highlights?: string[];
	}>>
> = {
	// PT. Bank Syariah Indonesia Tbk.
	'bank syariah indonesia': {
		id: {
			title: 'Officer Development Program IT',
			role: 'Trainee / Calon Pemimpin IT',
			description: 'Program akselerasi kepemimpinan dan rekayasa perbankan syariah di PT Bank Syariah Indonesia Tbk.',
			content: 'Mempelajari operasional perbankan inti, manajemen keuangan korporat, kepemimpinan, dan arsitektur sistem enterprise.',
			highlights: [
				'Pelatihan intensif operasional perbankan syariah dan keuangan korporat enterprise',
				'Pengembangan kepemimpinan terstruktur untuk arsitektur perbankan masa depan',
				'Penerapan prinsip perbankan syariah pada teknologi finansial modern'
			]
		},
		ja: {
			title: 'ITオフィサー開発プログラム (ODP IT)',
			role: '研修生 / ITスペシャリスト',
			description: 'PT Bank Syariah Indonesia Tbk.におけるITリーダーシップおよび銀行業務プログラム。',
			content: '銀行業務オペレーション、企業財務、リーダーシップ、およびイスラム金融原則の習得。',
			highlights: [
				'銀行業務オペレーションおよび企業財務の専門研修',
				'構造化されたリーダーシップ育成プログラムの修了',
				'イスラム金融原則とフィンテックへの応用'
			]
		},
		ar: {
			title: 'برنامج تطوير مسؤولي تقنية المعلومات (ODP IT)',
			role: 'متدرب / أخصائي تقنية المعلومات',
			description: 'برنامج لتطوير القيادات المصرفية وهندسة النظم في بنك الشريعة الإندونيسي (BSI).',
			content: 'دراسة العمليات المصرفية، المالية المؤسسية، القيادة، ومبادئ الصيرفة الإسلامية.',
			highlights: [
				'تدريب مكثف في العمليات المصرفية والتمويل المؤسسي',
				'تطوير مهارات القيادة من خلال برنامج هيكلي مخصص',
				'تطبيق مبادئ الصيرفة الإسلامية على التقنيات المصرفية الحديثة'
			]
		}
	},
	// PT. Suitmedia Kreasi Indonesia (Software Engineer)
	'suitmedia kreasi indonesia': {
		id: {
			title: 'Software Engineer',
			role: 'Backend Engineer',
			description: 'Bertanggung jawab atas arsitektur backend, optimasi performa API, dan pengelolaan sistem berbasis Laravel dan microservices untuk berbagai klien enterprise.',
			highlights: [
				'Mengelola 5 proyek pemeliharaan dan 1 proyek fase pengembangan sistem skala enterprise',
				'Menyelesaikan 40% perbaikan bug dan penyesuaian fitur lebih cepat dari estimasi waktu dengan efisiensi tinggi',
				'Mengimplementasikan strategi tuning query dan caching yang meningkatkan performa sistem sebesar 20%',
				'Warehouse Management System: Mengembangkan modul pergerakan inventaris dan transfer stok antar gerai',
				'Company Profile: Merancang company profile interaktif dengan dukungan multi-bahasa menggunakan Laravel dan MySQL',
				'Aplikasi Crowdfunding: Pemeliharaan API backend Laravel dan CMS admin Nuxt.js',
				'Aplikasi Admisi Mahasiswa: Mengembangkan API performa tinggi dan CMS Web App menggunakan Laravel',
				'Aplikasi Ride-sharing: Pemeliharaan dan optimasi backend Laravel & MySQL',
				'Website Traceability Produk: Pemeliharaan pelacakan produk dan manajemen katalog data'
			]
		},
		ja: {
			title: 'バックエンド ソフトウェアエンジニア',
			role: 'バックエンド開発',
			description: 'PT Eigerindo、KSEI、Danoneなど大手クライアント向けエンタープライズWebアプリケーションのバックエンド開発とパフォーマンス最適化を担当。',
			highlights: [
				'5つの保守プロジェクトと1つの大規模開発フェーズプロジェクトを担当',
				'プロアクティブな問題解決により、バグ修正や要件調整の40%を予定より前倒しで解決',
				'パフォーマンス最適化戦略を実施し、システム応答性を20%向上',
				'倉庫管理システム (WMS): 店舗間在庫移動および在庫追跡機能を設計・開発',
				'多言語対応コーポレートサイト: LaravelとMySQLを用いた多言語対応システムの開発',
				'クラウドファンディングアプリ: Laravel APIおよびNuxt.js CMSの保守・改修',
				'大学入学出願システム: Laravelを用いた高負荷対応APIおよび管理画面の開発'
			]
		},
		ar: {
			title: 'مهندس برمجيات (Software Engineer)',
			role: 'مطور الواجهات الخلفية (Backend)',
			description: 'تطوير الأنظمة والواجهات البرمجية للعديد من المشاريع المؤسسية لعملاء كبار مثل KSEI و Danone و Eigerindo.',
			highlights: [
				'إدارة 5 مشاريع صيانة ومشروع تطوير واسع النطاق للأنظمة المؤسسية',
				'حل 40% من الأخطاء البرمجية قبل الموعد المحدد بكفاءة عالية',
				'تحسين أداء النظام بنسبة 20% عبر تقنيات التخزين المؤقت وتحسين استعلامات قواعد البيانات',
				'نظام إدارة المستودعات (WMS): صيانة وتطوير ميزات حركة المخزون بين المتاجر',
				'تطبيقات التمويل الجماعي والقبول الجامعي: تطوير وصيانة واجهات برمجة التطبيقات (APIs) ولوحات التحكم'
			]
		}
	},
	// Faculty of Computer Science Brawijaya University
	'brawijaya university': {
		id: {
			title: 'Asisten Laboratorium & Praktikum',
			role: 'Teaching Assistant',
			description: 'Membimbing mahasiswa dalam praktikum Pemrograman Berorientasi Objek, Basis Data, dan Rekayasa Perangkat Lunak di Fakultas Ilmu Komputer.',
			highlights: [
				'Membimbing 100+ mahasiswa dalam praktikum pemrograman berorientasi objek dan basis data',
				'Menyusun materi praktikum, modul kode, dan melakukan penilaian tugas laboratorium'
			]
		},
		ja: {
			title: '学部研究室・教育アシスタント',
			role: 'ティーチングアシスタント',
			description: 'オブジェクト指向プログラミング、データベース、ソフトウェア工学の演習指導と学生支援を担当。',
			highlights: [
				'100名以上の学生に対しオブジェクト指向プログラミングおよびDBの指導を実施',
				'演習教材・課題の作成およびコードレビュー評価を担当'
			]
		},
		ar: {
			title: 'مساعد مختبر وتدريس',
			role: 'مساعد تدريس',
			description: 'إرشاد الطلاب في مساقات البرمجة كائنية التوجه، قواعد البيانات، وهندسة البرمجيات في كلية علوم الحاسوب.',
			highlights: [
				'تدريب أكثر من 100 طالب في مختبرات البرمجة وقواعد البيانات',
				'إعداد المناهج العملية وتقييم المشاريع البرمجية'
			]
		}
	}
};

/** Curated project translations */
const PROJECT_TRANSLATIONS: Record<
	string,
	Partial<Record<Locale, {
		title?: string;
		subtitle?: string;
		description?: string;
		content?: string;
	}>>
> = {
	'enterprise': {
		id: {
			title: 'Arsitektur Platform AI Agentic Enterprise',
			subtitle: 'Multi-Agent Gateway, Context Graph, Zero-Trust PII Masking & Evaluasi Otomatis',
			description: 'Arsitektur platform AI agen tingkat enterprise untuk lingkungan teregulasi ketat. Dilengkapi Dynamic Routing Gateway, Blast Radius Analysis, PII Guardrails, dan Verification Harness.'
		},
		ja: {
			title: 'エンタープライズ Agentic AI プラットフォームアーキテクチャ',
			subtitle: 'マルチエージェントGateway、コンテキストグラフ、Zero-Trust PIIマスキング＆評価ハーネス',
			description: '高規制環境向けのエンタープライズAIエージェントプラットフォーム。動的ルーティングゲートウェイ、影響半径分析、決定論的評価ハーネスを完備。'
		},
		ar: {
			title: 'معمارية منصة الوكلاء الأذكياء للمؤسسات (Enterprise Agentic AI)',
			subtitle: 'بوابة الوكلاء المتعددين، رسم بياني للسياق، حماية البيانات الحساسة PII، وحزم التقييم الحتمي',
			description: 'معمارية منصة ذكاء اصطناعي للمؤسسات المصرفية والمالية مع بوابة توجيه ديناميكية وتحليل نطاق التأثير وحماية البيانات الشخصية.'
		}
	},
	'portfolio': {
		id: {
			title: 'Portofolio Pribadi & Headless CMS',
			subtitle: 'SvelteKit, TailwindCSS, PostgreSQL & Integrasi Obsidian Publishing',
			description: 'Platform portofolio web modern dengan rendering server-side, sistem multi-bahasa terintegrasi, dan sinkronisasi otomatis artikel dari Obsidian Vault.'
		},
		ja: {
			title: '個人ポートフォリオ ＆ Headless CMS',
			subtitle: 'SvelteKit, TailwindCSS, PostgreSQL, Obsidian Publishing統合',
			description: 'SSR、多言語ローカリゼーション、およびObsidian Vaultからの自動ノート同期を備えたモダンなポートフォリオWebサイト。'
		},
		ar: {
			title: 'معرض الأعمال الشخصي ولوحة التحكم المستقلة (Headless CMS)',
			subtitle: 'مبني بواسطة SvelteKit و TailwindCSS و PostgreSQL مع ربط Obsidian',
			description: 'منصة ويب شخصية حديثة تدعم اللغات المتعددة والمزامنة التلقائية للمقالات مباشرة من Obsidian Vault.'
		}
	},
	'warehouse': {
		id: {
			title: 'Sistem Manajemen Gudang (WMS)',
			subtitle: 'Manajemen Inventaris Multi-Cabang & Pelacakan Stok Real-Time',
			description: 'Aplikasi enterprise untuk mengelola siklus hidup pergudangan, pergerakan stok antar toko, dan otomatisasi audit inventaris.'
		},
		ja: {
			title: '倉庫管理システム (WMS)',
			subtitle: '複数拠点在庫管理 ＆ リアルタイムストック追跡',
			description: '店舗間在庫移動、出荷管理、棚卸し自動化を支援するエンタープライズ倉庫管理プラットフォーム。'
		},
		ar: {
			title: 'نظام إدارة المستودعات (WMS)',
			subtitle: 'إدارة المخزون متعدد المتاجر والتتبع في الوقت الفعلي',
			description: 'تطبيق مؤسسي لإدارة حركة البضائع بين المتاجر وتدقيق المخزون وتحسين سلاسل التوريد.'
		}
	}
};

import type { Experience } from '$lib/types/experience';
import type { Project } from '$lib/types/project';

/**
 * Returns a localized version of an Experience entity.
 * Seamlessly checks for inline delimiters first, then curated dictionary, then defaults to DB text.
 */
export function localizeExperience<T extends Partial<Experience>>(exp: T, locale: Locale): T {
	if (!exp) return exp;

	// Check for matching curated translations by company or title
	const companyKey = Object.keys(EXPERIENCE_TRANSLATIONS).find((key) => 
		exp.company?.toLowerCase().includes(key)
	);

	const override = companyKey ? EXPERIENCE_TRANSLATIONS[companyKey]?.[locale] : undefined;

	return {
		...exp,
		title: override?.title || (exp.title ? localizeText(exp.title, locale) : ''),
		role: override?.role || (exp.role ? localizeText(exp.role, locale) : ''),
		description: override?.description || (exp.description ? localizeText(exp.description, locale) : exp.description),
		content: override?.content || (exp.content ? localizeText(exp.content, locale) : exp.content),
		highlights: override?.highlights || (exp.highlights ? exp.highlights.map((h) => localizeText(h, locale)) : [])
	};
}

/**
 * Returns a localized version of a Project entity.
 */
export function localizeProject<T extends Partial<Project>>(project: T, locale: Locale): T {
	if (!project) return project;

	const projectKey = Object.keys(PROJECT_TRANSLATIONS).find((key) => 
		project.title?.toLowerCase().includes(key) || project.subtitle?.toLowerCase().includes(key)
	);

	const override = projectKey ? PROJECT_TRANSLATIONS[projectKey]?.[locale] : undefined;

	return {
		...project,
		title: override?.title || (project.title ? localizeText(project.title, locale) : ''),
		subtitle: override?.subtitle || (project.subtitle ? localizeText(project.subtitle, locale) : ''),
		description: override?.description || (project.description ? localizeText(project.description, locale) : ''),
		content: override?.content || (project.content ? localizeText(project.content, locale) : project.content)
	};
}

/**
 * Detects the language of a blog post based on its tags.
 */
export function getBlogLocale(blog: { tags?: Array<{ name: string } | string> }): {
	code: Locale;
	badge: string;
	label: string;
} | null {
	if (!blog.tags || !blog.tags.length) return null;

	const tagNames = blog.tags.map(t => (typeof t === 'string' ? t : t.name).toLowerCase());

	if (tagNames.some(t => t === 'id' || t === 'indonesia' || t === 'bahasa-indonesia' || t === 'lang:id')) {
		return { code: 'id', badge: '🇮🇩 ID', label: 'Bahasa Indonesia' };
	}
	if (tagNames.some(t => t === 'en' || t === 'english' || t === 'lang:en')) {
		return { code: 'en', badge: '🇬🇧 EN', label: 'English' };
	}
	if (tagNames.some(t => t === 'ja' || t === 'japanese' || t === 'nihongo' || t === 'lang:ja')) {
		return { code: 'ja', badge: '🇯🇵 JA', label: '日本語' };
	}
	if (tagNames.some(t => t === 'ar' || t === 'arabic' || t === 'lang:ar')) {
		return { code: 'ar', badge: '🇸🇦 AR', label: 'العربية' };
	}

	return null;
}
