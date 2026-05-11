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
    resultTitle: 'Hasil Analisis AI',
    safe: 'Terlihat Aman',
    unsafe: 'Berpotensi Bahaya',
    unknown: 'Tidak Diketahui',
    back: 'Kembali',
    theme: 'Tema',
    language: 'Bahasa',
    aboutTitle: 'Tentang Kami',
    aboutDesc: 'Mengenal FaktanyaDong lebih jauh.',
    liveMonitoring: 'Live Monitoring',
    ojkData: 'Data OJK 2024',
    urlLabel: 'Link URL',
    newsLabel: 'Link / Topik Berita',
    appNameLabel: 'Nama Aplikasi',
    darkMode: 'Gelap',
    lightMode: 'Terang',
    amoledMode: 'AMOLED',
    scamDesc: 'Waspada penipuan phising dan pencurian data.',
    hoaxDesc: 'Cek fakta berita dari link atau sekadar topik hangat.',
    pinjolDesc: 'Pastikan aplikasi pinjaman terdaftar resmi di OJK.',
    educationTitle: 'Literasi Digital',
    educationDesc: 'Kumpulan panduan untuk aman di dunia digital.',
    disclaimer: 'Pengecekan ini menggunakan AI. Tetaplah waspada.',
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
    loadingStages: [
      'Initializing AI module...',
      'Scanning content metadata...',
      'Performing deep analysis...',
      'Compiling security report...'
    ],
  }
};
