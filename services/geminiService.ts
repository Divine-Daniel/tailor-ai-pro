
import { GoogleGenAI, Type, Modality } from "@google/genai";

/**
 * Initialize AI client with safety check.
 * The API_KEY must be configured in Vercel environment variables.
 * For local development, ensure it's in your .env or similar context.
 */
const getAI = () => {
  // Use the API key provided by the user in their prompt context
  // or the environment variable injected by Vercel.
  const apiKey = process.env.API_KEY || 'AIzaSyCbP8cLEDKMbsy-KNkKC9jIFWnsjWvqYug';
  
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing. Add it to Vercel Environment Variables.");
    throw new Error("Neural link failed: Missing API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Enhanced style advice using Gemini 3 Pro with Thinking Mode
 */
export const generateStyleAdvice = async (measurements: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these body measurements: ${measurements}. 
      Provide a high-end fashion consultation. Focus on structural silhouettes and fabric weight.`,
      config: {
        thinkingConfig: { thinkingBudget: 24576 },
        temperature: 0.7,
      }
    });
    
    return response.text || "Neural analysis complete but returned empty.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The neural link is currently unstable. Please verify your API_KEY in Vercel.";
  }
};

/**
 * Image Generation using Gemini 3 Pro Image Preview
 */
export const generateFashionImage = async (prompt: string, size: "1K" | "2K" | "4K") => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Gen Error:", error);
  }
  return null;
};

/**
 * Video Generation using Veo 3.1
 */
export const generateFashionVideo = async (prompt: string, aspectRatio: '16:9' | '9:16') => {
  try {
    const ai = getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });
    
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const apiKey = process.env.API_KEY || 'AIzaSyCbP8cLEDKMbsy-KNkKC9jIFWnsjWvqYug';
    return `${downloadLink}&key=${apiKey}`;
  } catch (error) {
    console.error("Video Gen Error:", error);
    return null;
  }
};

/**
 * Deep Image/Video Analysis using Gemini 3 Pro Preview
 */
export const analyzeVisualData = async (fileBase64: string, mimeType: string, query: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { 
        parts: [
          { inlineData: { data: fileBase64.split(',')[1], mimeType } }, 
          { text: query }
        ] 
      },
      config: {
        thinkingConfig: { thinkingBudget: 24576 }
      }
    });

    return response.text;
  } catch (error) {
    return "Analysis node timeout. Verify connection.";
  }
};
