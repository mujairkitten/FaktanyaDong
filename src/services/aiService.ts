import { GoogleGenAI } from "@google/genai";
import { ScanResult, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeContent = async (
  type: 'scam' | 'hoax' | 'pinjol' | 'education',
  input: string,
  extra?: string,
  lang: Language = 'id'
): Promise<ScanResult> => {
  try {
    let prompt = "";
    
    if (type === 'scam') {
      prompt = `
        Analisis link berikut untuk potensi SCAM/PHISHING.
        Link: ${input}
        Mengaku sebagai: ${extra || "Tidak disebutkan"}
        Bahasa Response: ${lang === 'id' ? 'Indonesia' : 'English'}
        
        Berikan jawaban dalam format JSON mentah (tanpa markdown block):
        {
          "isSafe": boolean,
          "confidence": number (0-1),
          "trustScore": number (0-100),
          "explanation": "penjelasan singkat tentang kenapa ini scam atau bukan",
          "recommendation": "saran tindakan untuk user",
          "risks": ["risiko 1", "risiko 2"],
          "factors": ["faktor 1 (misal: domain baru)", "faktor 2"]
        }
      `;
    } else if (type === 'hoax') {
      prompt = `
        Analisis berita dari link/konten berikut untuk potensi HOAX atau disinformasi.
        Konten: ${input}
        Bahasa Response: ${lang === 'id' ? 'Indonesia' : 'English'}
        
        Berikan jawaban dalam format JSON mentah (tanpa markdown block):
        {
          "isSafe": boolean (true if fact, false if hoax),
          "confidence": number,
          "trustScore": number (0-100),
          "explanation": "analisis kebenaran berita",
          "recommendation": "saran verifikasi lanjut",
          "risks": ["poin misinformasi"],
          "factors": ["sumber terverifikasi", "konsistensi narasi", "bukti pendukung"]
        }
      `;
    } else if (type === 'pinjol') {
      prompt = `
        VERIFIKASI LEGALITAS PINJAMAN ONLINE (PINJOL) melalui data OJK (Otoritas Jasa Keuangan).
        Cek apakah entitas ini terdaftar di daftar resmi OJK per tahun 2024-2025.
        Nama/Link: ${input}
        Bahasa Response: ${lang === 'id' ? 'Indonesia' : 'English'}
        
        Berikan jawaban dalam format JSON mentah (tanpa markdown block):
        {
          "isSafe": boolean (true if legal/OJK registered, false if illegal),
          "confidence": number,
          "trustScore": number (0-100, 100 if officially OJK registered),
          "explanation": "status pendaftaran di OJK dan rekam jejak",
          "recommendation": "saran keamanan finansial",
          "risks": ["konsekuensi pinjol ilegal jika relevan"],
          "factors": ["Terdaftar di OJK", "Alamat kantor jelas", "Sesuai AFPI"]
        }
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: type === 'pinjol' ? [{ googleSearch: {} }] : undefined
      }
    });
    
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      isSafe: false,
      confidence: 0,
      trustScore: 0,
      explanation: lang === 'id' ? "Gagal menganalisis konten. Silakan coba lagi." : "Failed to analyze content. Please try again.",
      recommendation: lang === 'id' ? "Jangan klik link tersebut sebelum ada kepastian." : "Do not click the link until verified.",
    };
  }
};
