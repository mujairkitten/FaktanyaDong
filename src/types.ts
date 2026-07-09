export type ThemeMode = 'light' | 'dark' | 'amoled';
export type Language = 'id' | 'en';

export interface ScanResult {
  isSafe: boolean;
  confidence: number;
  trustScore: number; // 0-100 percentage
  explanation: string;
  recommendation: string;
  risks?: string[];
  factors?: string[];
}

export type ViewType = 'scam' | 'hoax' | 'pinjol' | 'education' | 'about';

export const TRANSLATIONS = {
  id: {
    title: 'FaktanyaDong',
    subtitle: 'Cyber Security & Fact Checker',
    scamTitle: 'Cek Link Scam',
    hoaxTitle: 'Cek Berita Hoax',
    pinjolTitle: 'Cek Legalitas Pinjol',
    check: 'Periksa Sekarang',
    checking: 'Menganalisis...',
    scamPlaceholder: 'Tempel link yang mencurigakan di sini...',
    claimedEntity: 'Mengaku sebagai siapa? (Contoh: Shopee, Bank BCA)',
    claimedLabel: 'Mengaku Sebagai',
    hoaxPlaceholder: 'Tempel link atau tulis topik berita di sini...',
    pinjolPlaceholder: 'Masukkan nama atau link aplikasi pinjol...',
    resultTitle: 'Laporan Pemeriksaan AI',
    safe: 'Aman Diakses',
    unsafe: 'Hati-hati! Berbahaya',
    unknown: 'Belum Bisa Dipastikan',
    back: 'Kembali',
    theme: 'Tema',
    language: 'Bahasa',
    aboutTitle: 'Tentang Kami',
    aboutDesc: 'Mengenal FaktanyaDong lebih jauh.',
    liveMonitoring: 'Pengecekan Langsung',
    ojkData: 'Data Resmi OJK',
    urlLabel: 'Alamat Link (URL)',
    newsLabel: 'Isi atau Topik Berita',
    appNameLabel: 'Nama Aplikasi Pintar',
    darkMode: 'Gelap',
    lightMode: 'Terang',
    amoledMode: 'AMOLED',
    scamDesc: 'Bantu deteksi penipuan online, link palsu, dan pencurian akun.',
    hoaxDesc: 'Cek kebenaran berita agar terhindar dari kabar bohong.',
    pinjolDesc: 'Pastikan pinjaman online itu aman atau justru jebakan ilegal.',
    educationTitle: 'Tips Pintar',
    educationDesc: 'Panduan sederhana dan praktis agar selalu aman di internet.',
    disclaimer: 'Analisis oleh AI. Jangan lengah, tetap gunakan logika sehat.',
    explanationLabel: 'APA MAKSUD HASIL INI?',
    factorsLabel: 'ALASAN & BUKTI YANG DIALISIS',
    adviceLabel: 'SARAN TINDAKAN UNTUK ANDA',
    errorEmpty: 'Bagian ini tidak boleh kosong',
    errorInvalidUrl: 'Format URL tidak valid',
    loadingStages: [
      'Menginisialisasi modul AI...',
      'Memindai metadata konten...',
      'Melakukan analisis mendalam...',
      'Menyusun laporan keamanan...'
    ],
  },
  en: {
    title: 'FaktanyaDong',
    subtitle: 'Cyber Security & Fact Checker',
    scamTitle: 'Check Scam Link',
    hoaxTitle: 'Check Hoax News',
    pinjolTitle: 'Check Loan Legality',
    check: 'Check Now',
    checking: 'Analyzing...',
    scamPlaceholder: 'Paste suspicious link here...',
    claimedEntity: 'Claiming to be? (e.g., WhatsApp, Amazon)',
    claimedLabel: 'Claimed Identity',
    hoaxPlaceholder: 'Paste link or type news topic here...',
    pinjolPlaceholder: 'Enter loan name or link...',
    resultTitle: 'AI Analysis Result',
    safe: 'Appears Safe',
    unsafe: 'Potential Danger',
    unknown: 'Unknown',
    back: 'Back',
    theme: 'Theme',
    language: 'Language',
    aboutTitle: 'About Us',
    aboutDesc: 'Learn more about FaktanyaDong.',
    liveMonitoring: 'Live Monitoring',
    ojkData: 'OJK Data 2024',
    urlLabel: 'URL Link',
    newsLabel: 'Link / News Topic',
    appNameLabel: 'App Name',
    darkMode: 'Dark',
    lightMode: 'Light',
    amoledMode: 'AMOLED',
    scamDesc: 'Beware of phishing and data theft scams.',
    hoaxDesc: 'Verify news facts from links or trending topics.',
    pinjolDesc: 'Ensure the loan app is officially registered with OJK.',
    educationTitle: 'Digital Literacy',
    educationDesc: 'A collection of guides to stay safe in the digital world.',
    disclaimer: 'This check uses AI. Stay vigilant.',
    explanationLabel: 'EXPLANATION',
    factorsLabel: 'ASSESSMENT FACTORS',
    adviceLabel: 'SECURITY ADVICE',
    errorEmpty: 'This field cannot be empty',
    errorInvalidUrl: 'Invalid URL format',
    loadingStages: [
      'Initializing AI module...',
      'Scanning content metadata...',
      'Performing deep analysis...',
      'Compiling security report...'
    ],
  }
};
