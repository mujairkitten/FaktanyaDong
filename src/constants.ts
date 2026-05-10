import { Language } from './types';

export interface EducationArticle {
  id: string;
  title: string;
  category: string;
  content: string[];
  icon: string;
}

export const EDUCATION_CONTENT: Record<Language, EducationArticle[]> = {
  id: [
    {
      id: 'safe-internet',
      title: 'Cara Aman Berinternet',
      category: 'Privasi',
      icon: 'ShieldCheck',
      content: [
        'Gunakan kata sandi yang kuat dan unik untuk setiap akun.',
        'Aktifkan Authentikasi Dua Faktor (2FA) di mana pun memungkinkan.',
        'Jangan pernah membagikan kode OTP atau PIN kepada siapa pun.',
        'Gunakan jaringan Wi-Fi yang aman dan hindari transaksi di Wi-Fi publik.',
        'Selalu perbarui perangkat lunak dan aplikasi Anda ke versi terbaru.'
      ]
    },
    {
      id: 'phishing',
      title: 'Mengenali Tanda Phishing',
      category: 'Keamanan',
      icon: 'ShieldAlert',
      content: [
        'Perhatikan alamat email pengirim, biasanya menggunakan domain gratis atau typo.',
        'Pesan seringkali menciptakan rasa urgensi atau ketakutan (misal: akun akan diblokir).',
        'Terdapat kesalahan tata bahasa atau ejaan yang mencolok.',
        'Meminta data sensitif seperti nomor kartu kredit atau kata sandi.',
        'Link yang diberikan mengarah ke website palsu yang mirip aslinya.'
      ]
    },
    {
      id: 'hoax',
      title: 'Dampak Berita Hoax',
      category: 'Etika',
      icon: 'Newspaper',
      content: [
        'Hoax dapat memicu kepanikan massal dan keresahan sosial.',
        'Bisa merusak reputasi seseorang atau institusi secara tidak adil.',
        'Mengalihkan perhatian dari isu-isu penting yang sebenarnya.',
        'Menyebabkan perpecahan dan konflik antar kelompok masyarakat.',
        'Biasanya menggunakan judul yang bombastis dan provokatif.'
      ]
    },
    {
      id: 'pinjol-legal',
      title: 'Hukum Pinjol Ilegal',
      category: 'Hukum',
      icon: 'Wallet',
      content: [
        'Pinjol legal wajib terdaftar dan diawasi oleh OJK.',
        'Pinjol ilegal seringkali meminta akses ke seluruh kontak di ponsel.',
        'Suku bunga pinjol ilegal biasanya sangat tinggi dan tidak transparan.',
        'Penagihan pinjol ilegal sering disertai ancaman dan intimidasi.',
        'Masyarakat disarankan hanya meminjam sesuai kebutuhan dan kapasitas.'
      ]
    }
  ],
  en: [
    {
      id: 'safe-internet',
      title: 'How to Stay Safe Online',
      category: 'Privacy',
      icon: 'ShieldCheck',
      content: [
        'Use strong and unique passwords for every account.',
        'Enable Two-Factor Authentication (2FA) whenever possible.',
        'Never share OTP codes or PINs with anyone.',
        'Use secure Wi-Fi networks and avoid transactions on public Wi-Fi.',
        'Keep your software and applications updated to the latest version.'
      ]
    },
    {
      id: 'phishing',
      title: 'Recognizing Phishing Signs',
      category: 'Security',
      icon: 'ShieldAlert',
      content: [
        'Check the sender\'s email address; they often use free or typo-ridden domains.',
        'Messages often create a sense of urgency or fear (e.g., account will be blocked).',
        'There are noticeable grammatical or spelling errors.',
        'Requests for sensitive data like credit card numbers or passwords.',
        'The provided links lead to fake websites that look like the original.'
      ]
    },
    {
      id: 'hoax',
      title: 'Impact of Hoax News',
      category: 'Ethics',
      icon: 'Newspaper',
      content: [
        'Hoaxes can trigger mass panic and social unrest.',
        'They can unfairly damage the reputation of individuals or institutions.',
        'They distract focus from actual important issues.',
        'They cause division and conflict between social groups.',
        'They usually use bombastic and provocative headlines.'
      ]
    },
    {
      id: 'pinjol-legal',
      title: 'Illegal Online Loan Laws',
      category: 'Legal',
      icon: 'Wallet',
      content: [
        'Legal loans must be registered and supervised by OJK.',
        'Illegal loans often request access to all contacts on your phone.',
        'Interest rates for illegal loans are usually very high and non-transparent.',
        'Illegal loan collection often involves threats and intimidation.',
        'People are advised to borrow only according to their needs and capacity.'
      ]
    }
  ]
};
