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
    hoaxPlaceholder: 'Tempel link berita di sini...',
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
    darkMode: 'Gelap',
    lightMode: 'Terang',
    amoledMode: 'AMOLED',
    scamDesc: 'Waspada penipuan phising dan pencurian data.',
    hoaxDesc: 'Bedakan fakta dari opini yang menyesatkan.',
    pinjolDesc: 'Pastikan aplikasi pinjaman terdaftar resmi di OJK.',
    educationTitle: 'Literasi Digital',
    educationDesc: 'Kumpulan panduan untuk aman di dunia digital.',
    disclaimer: 'Pengecekan ini menggunakan AI. Tetaplah waspada.',
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
    hoaxPlaceholder: 'Paste news link here...',
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
    darkMode: 'Dark',
    lightMode: 'Light',
    amoledMode: 'AMOLED',
    scamDesc: 'Beware of phishing and data theft scams.',
    hoaxDesc: 'Distinguish facts from misleading opinions.',
    pinjolDesc: 'Ensure the loan app is officially registered with OJK.',
    educationTitle: 'Digital Literacy',
    educationDesc: 'A collection of guides to stay safe in the digital world.',
    disclaimer: 'This check uses AI. Stay vigilant.',
  }
};
