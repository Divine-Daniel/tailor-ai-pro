
import { GoogleGenAI, Type, Modality } from "@google/genai";

/**
 * Initialize AI client using the exclusive process.env.API_KEY.
 */
const getAI = () => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing. Ensure the environment variable is configured.");
    throw new Error("Neural link failed: Missing API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

// Analyze measurements and provide style advice using Gemini 3 Pro.
export const generateStyleAdvice = async (measurements: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these body measurements: ${measurements}. 
      Provide a high-end fashion consultation. Focus on structural silhouettes and fabric weight.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // max budget for gemini-3-pro-preview
        temperature: 0.7,
      }
    });
    return response.text || "Neural analysis complete but returned empty.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The neural link is currently unstable. Please verify your connection.";
  }
};

// Generate high-resolution fashion imagery using Gemini 3 Pro Image.
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
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
  } catch (error) {
    console.error("Image Gen Error:", error);
  }
  return null;
};

// Generate cinematic fashion videos using Veo 3.1.
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
    // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
    return `${downloadLink}&key=${process.env.API_KEY}`;
  } catch (error) {
    console.error("Video Gen Error:", error);
    return null;
  }
};

// Perform deep visual analysis on provided image data using Gemini 3 Pro.
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
        thinkingConfig: { thinkingBudget: 32768 } // max budget for gemini-3-pro-preview
      }
    });
    return response.text;
  } catch (error) {
    return "Analysis node timeout. Verify connection.";
  }
};
