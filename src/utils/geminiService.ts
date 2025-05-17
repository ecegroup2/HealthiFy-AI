
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
              text: `You are a specialized medical AI working with ECG analysis. Analyze this ECG image and provide your assessment.
              
              I'll give you the results from other ECG detection models as context:
              ${JSON.stringify(existingResults, null, 2)}
              
              Based on the ECG image and these model detections, please provide:
              1. Your diagnosis of the most likely condition (either normal ECG or a specific abnormality)
              2. Your confidence level (0-100%)
              3. A brief explanation of your assessment
              
              Format your response ONLY as a JSON object with these exact keys: 
              {
                "condition": "diagnosis here",
                "confidence": number,
                "explanation": "your explanation here"
              }`
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
        temperature: 0.1,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    };

    console.log("Sending request to Gemini API...");
    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Received response from Gemini API");
    
    // Extract text content from the response
    const textContent = response.data.candidates[0].content.parts[0].text;
    console.log("Gemini raw response:", textContent);
    
    // Try to extract JSON from the text
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      try {
        const result = JSON.parse(jsonStr);
        console.log("Successfully parsed Gemini JSON response:", result);
        return {
          condition: result.condition,
          confidence: result.confidence,
          explanation: result.explanation
        };
      } catch (jsonError) {
        console.error("Error parsing Gemini JSON response:", jsonError);
        // Fallback if JSON parsing fails - attempt to extract information from text
        return extractStructuredInfoFromText(textContent);
      }
    } else {
      console.log("No JSON object found in response, attempting to extract info from text");
      return extractStructuredInfoFromText(textContent);
    }
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Gemini API error details:", error.response.data);
    }
    return {
      condition: "Error in Gemini analysis",
      confidence: 0,
      explanation: "An error occurred when consulting the Gemini model."
    };
  }
}

// Helper function to extract structured information when JSON parsing fails
function extractStructuredInfoFromText(text: string): GeminiResult {
  let condition = "Unknown";
  let confidence = 0;
  let explanation = "";

  // Try to find condition
  const conditionMatch = text.match(/condition[:\s]+"?([^"\n,]+)"?/i) || 
                        text.match(/diagnosis[:\s]+"?([^"\n,]+)"?/i);
  if (conditionMatch && conditionMatch[1]) {
    condition = conditionMatch[1].trim();
  }

  // Try to find confidence
  const confidenceMatch = text.match(/confidence[:\s]+"?(\d+)"?/i) || 
                          text.match(/(\d+)%/);
  if (confidenceMatch && confidenceMatch[1]) {
    confidence = parseInt(confidenceMatch[1], 10);
  }

  // Try to find explanation
  const explanationMatch = text.match(/explanation[:\s]+"([^"]+)"/i) || 
                          text.match(/explanation:\s*(.+?)(?:\n|$)/i);
  if (explanationMatch && explanationMatch[1]) {
    explanation = explanationMatch[1].trim();
  } else {
    // If no specific explanation section found, use the whole text
    explanation = "Based on the ECG analysis, " + condition;
  }

  return { condition, confidence, explanation };
}
