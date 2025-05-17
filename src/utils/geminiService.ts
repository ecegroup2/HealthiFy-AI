
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
              
              IMPORTANT: Format your response ONLY as a valid JSON object with keys: condition, confidence (number), explanation (string). Do not include any other text or formatting outside the JSON object.`
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

    console.log("Gemini API Response:", response.data);

    // Parse the response to extract the JSON object
    const textContent = response.data.candidates[0].content.parts[0].text;
    console.log("Gemini raw text response:", textContent);
    
    // Try to find and extract JSON from the response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      console.log("Extracted JSON string:", jsonStr);
      try {
        const result = JSON.parse(jsonStr);
        return {
          condition: result.condition || "Analysis inconclusive",
          confidence: typeof result.confidence === 'number' ? result.confidence : 0,
          explanation: result.explanation || "No explanation provided"
        };
      } catch (jsonError) {
        console.error("Error parsing JSON from Gemini response:", jsonError);
        return {
          condition: "JSON parsing error",
          confidence: 0,
          explanation: "Failed to parse the structured analysis from Gemini."
        };
      }
    }

    // Fallback in case JSON parsing fails
    return {
      condition: "Analysis inconclusive",
      confidence: 0,
      explanation: "Gemini model could not provide a structured analysis."
    };
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data || error.message);
    }
    return {
      condition: "Error in Gemini analysis",
      confidence: 0,
      explanation: "An error occurred when consulting the Gemini model. Please check your API key and try again."
    };
  }
}
