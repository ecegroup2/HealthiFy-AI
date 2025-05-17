
import axios from 'axios';

const GEMINI_API_KEY = "AIzaSyB2DfZV6204BrsYO2d0sxZkiNEdXYn3N1Y";
const GEMINI_MODEL = "gemini-2.5-pro-preview";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface GeminiResult {
  condition: string;
  confidence: number;
  explanation: string;
}

export async function analyzeECGWithGemini(imageBase64: string, existingResults: any): Promise<GeminiResult> {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this ECG image and provide a medical assessment. I'll give you the results from other models as context:
              
              Context from other models:
              ${JSON.stringify(existingResults, null, 2)}
              
              Based on this ECG image and the context from other models, please provide:
              1. The most likely condition (either confirm one of the existing detections or identify a new condition)
              2. A confidence score (0-100%)
              3. A brief explanation of your assessment
              
              Format your response as a JSON object with keys: condition, confidence (number), explanation (string)`
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    };

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Parse the response to extract the JSON object
    const textContent = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const result = JSON.parse(jsonStr);
      return {
        condition: result.condition,
        confidence: result.confidence,
        explanation: result.explanation
      };
    }

    // Fallback in case JSON parsing fails
    return {
      condition: "Analysis inconclusive",
      confidence: 0,
      explanation: "Gemini model could not provide a structured analysis."
    };
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    return {
      condition: "Error in Gemini analysis",
      confidence: 0,
      explanation: "An error occurred when consulting the Gemini model."
    };
  }
}
