import { GoogleGenAI, Type, Modality } from "@google/genai";

// Initialize AI client
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Enhanced style advice using Gemini 3 Pro with Thinking Mode
 */
export const generateStyleAdvice = async (measurements: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these precise body measurements: ${measurements}. 
    Provide a deeply reasoned, high-end fashion consultation. 
    Focus on:
    1. Structural silhouettes that balance the proportions.
    2. Fabric weight and drape recommendations.
    3. Specific tailoring adjustments for a bespoke fit.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      temperature: 0.7,
    }
  });
  
  return response.text || "Neural analysis interrupted.";
};

/**
 * Fabric estimation with complex reasoning via Thinking Mode
 */
export const estimateFabric = async (garmentType: string, measurements: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Calculate exact fabric requirement in meters for a ${garmentType} given these measurements: ${measurements}. 
    Consider seam allowances, fabric nap, and pattern matching for luxury construction.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          meters: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          confidence: { type: Type.NUMBER }
        },
        required: ["meters", "reasoning", "confidence"]
      }
    }
  });
  
  try {
    return response.text ? JSON.parse(response.text) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Image Generation using Gemini 3 Pro Image Preview
 */
export const generateFashionImage = async (prompt: string, size: "1K" | "2K" | "4K") => {
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
  return null;
};

/**
 * Video Generation using Veo 3.1
 */
export const generateFashionVideo = async (prompt: string, aspectRatio: '16:9' | '9:16', base64Image?: string) => {
  const ai = getAI();
  const operationParams: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  };

  if (base64Image) {
    operationParams.image = {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/png'
    };
  }

  let operation = await ai.models.generateVideos(operationParams);
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};

/**
 * Deep Image/Video Analysis using Gemini 3 Pro Preview
 */
export const analyzeVisualData = async (fileBase64: string, mimeType: string, query: string) => {
  const ai = getAI();
  const dataPart = {
    inlineData: {
      data: fileBase64.split(',')[1],
      mimeType: mimeType
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [dataPart, { text: query }] },
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });

  return response.text;
};
