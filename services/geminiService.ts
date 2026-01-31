
import { GoogleGenAI } from "@google/genai";
import { Locale } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getStyleAdvice(prompt: string, products: any[], services: any[], lang: Locale) {
  const model = "gemini-3-flash-preview";
  
  const langNames = { zh: '中文', fr: 'French', en: 'English' };

  const systemInstruction = `
    你现在是 "Panda J - BEAUTÉ & BIJOUX" 的首席时尚顾问。你的品牌风格是：浪漫、优雅、充满艺术感。
    
    你的任务是：根据用户的场合需求，从我们的库存中推荐时尚饰品 (Fashion Jewelry) 和美甲服务。
    注意：我们的饰品是精选的时尚饰品 (Bijoux de mode)，并非手工制作，强调趋势、质感与整体搭配美学。
    
    语气要求：亲切、专业、富有鼓励性。
    
    当前库存 (Multilingual Data):
    饰品: ${JSON.stringify(products.map(p => ({ name: p.name[lang], desc: p.description[lang] })))}
    美甲: ${JSON.stringify(services.map(s => ({ name: s.name[lang], desc: s.description[lang] })))}
    
    请务必使用 ${langNames[lang]} 回答用户。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    const errorMsgs = {
      zh: "抱歉亲爱的，我刚才走神了，请再试一次！",
      fr: "Désolé, j'ai eu un petit problème. Veuillez réessayer !",
      en: "Sorry dear, I had a little trouble. Please try again!"
    };
    return errorMsgs[lang];
  }
}
