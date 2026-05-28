import { GoogleGenAI } from "@google/genai";
import { ScanResult, Language } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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
        ANALYSIS TASK: Verify if the following link/content is a SCAM or PHISHING attempt.
        CONTENT: ${input}
        CLAIMED ENTITY: ${extra || "Not specified"}
        LANGUAGE: ${lang === 'id' ? 'Indonesian' : 'English'}
        
        INSTRUCTIONS:
        1. Use Google Search to check if the link/domain is associated with official records or reported as a scam.
        2. Check for recent security alerts regarding the claimed entity.
        3. Provide a detailed explanation of why it is safe or a scam.
        4. ALL text fields in the JSON response MUST be written in ${lang === 'id' ? 'Indonesian' : 'English'}.
        5. MANDATORY STYLE: Write the explanation and recommendation in extremely simple, friendly, and easy-to-understand language for laypeople (orang awam). Avoid complex cyber-security jargon (like DNS, SSL handshake, headers) and keep it friendly, clear, and focused on practical impact. Explain it as if talking to a grandparent or teenager.
        
        Return ONLY a JSON object:
        {
          "isSafe": boolean,
          "confidence": number,
          "trustScore": number,
          "explanation": "concise explanation",
          "recommendation": "actionable advice",
          "risks": ["risk 1", "risk 2"],
          "factors": ["factor 1", "factor 2"]
        }
      `;
    } else if (type === 'hoax') {
      prompt = `
        ANALYSIS TASK: Fact-check the following news topic or link for HOAX/DISINFORMATION.
        CONTENT: ${input}
        LANGUAGE: ${lang === 'id' ? 'Indonesian' : 'English'}
        CURRENT DATE: ${new Date().toISOString().split('T')[0]}

        INSTRUCTIONS:
        1. MANDATORY: Use Google Search to find the latest, most accurate info as of today. 
        2. Verify against multiple credible international and local news sources.
        3. Look for official government statements or formal declarations.
        4. ALL text fields in the JSON response MUST be written in ${lang === 'id' ? 'Indonesian' : 'English'}.
        5. MANDATORY STYLE: Write the explanation and recommendation in extremely simple, friendly, and easy-to-understand language for laypeople (orang awam). Avoid complex terminology and make it friendly, clear, and focused on practical impact. Explain it as if talking to a grandparent or teenager.
        
        Return ONLY a JSON object:
        {
          "isSafe": boolean,
          "confidence": number,
          "trustScore": number,
          "explanation": "comprehensive fact-check analysis",
          "recommendation": "verification advice",
          "risks": ["misinformation points"],
          "factors": ["source 1", "source 2"]
        }
      `;
    } else if (type === 'pinjol') {
      prompt = `
        ANALYSIS TASK: Verify the legality of a loan service (Pinjol) using OJK (Otoritas Jasa Keuangan) records.
        CONTENT: ${input}
        LANGUAGE: ${lang === 'id' ? 'Indonesian' : 'English'}
        
        INSTRUCTIONS:
        1. Use Google Search to check the LATEST OJK official blacklist or registered list.
        2. ALL text fields in the JSON response MUST be written in ${lang === 'id' ? 'Indonesian' : 'English'}.
        3. MANDATORY STYLE: Write the explanation and recommendation in extremely simple, friendly, and easy-to-understand language for laypeople (orang awam). Avoid complex financial or legal jargon and keep it friendly, clear, and focused on practical impact. Explain it as if talking to a grandparent or teenager.
        
        Return ONLY a JSON object:
        {
          "isSafe": boolean,
          "confidence": number,
          "trustScore": number,
          "explanation": "official OJK status and record",
          "recommendation": "financial safety advice",
          "risks": ["illegal consequences"],
          "factors": ["OJK registered", "AFPI member", "clear office"]
        }
      `;
    } else {
      // Default fallback
      prompt = `Tell me about ${input} related to digital literacy. Return as JSON.`;
    }

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: [
          {
            googleSearch: {},
          },
        ],
      },
    });

    const text = response.text.replace(/```json|```/g, "").trim();
    
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
