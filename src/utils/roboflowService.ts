
import axios from "axios";
import { toast } from "sonner";

// Constants for the API endpoints
const ECG_DETECTION_URL = "https://serverless.roboflow.com/ecg-detection/3";
const ARRHYTHMIA_DETECTION_URL = "https://serverless.roboflow.com/arrhythmia_detection/1";
const API_KEY = "peg6MRNbP9N0Ko1S2p29";

// Interface for the detection results
export interface DetectionResult {
  time: number;
  image: {
    width: number;
    height: number;
  };
  predictions: Array<{
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    confidence: number;
    class: string;
    [key: string]: any;
  }>;
  model?: string;
}

// Interface for the combined results
export interface CombinedResults {
  ecgDetection: DetectionResult | null;
  arrhythmiaDetection: DetectionResult | null;
  hasError: boolean;
}

/**
 * Analyze an image using both ECG detection models
 */
export const analyzeECG = async (base64Image: string): Promise<CombinedResults> => {
  try {
    // Prepare the results object
    const results: CombinedResults = {
      ecgDetection: null,
      arrhythmiaDetection: null,
      hasError: false
    };
    
    // Create common request configuration
    const requestConfig = {
      method: "POST",
      params: { api_key: API_KEY },
      data: base64Image,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    
    // Send requests to both models in parallel
    const [ecgResponse, arrhythmiaResponse] = await Promise.all([
      axios({
        ...requestConfig,
        url: ECG_DETECTION_URL
      }).catch(error => {
        console.error("ECG Detection Error:", error);
        toast.error("Error analyzing with ECG detection model");
        return { data: null };
      }),
      
      axios({
        ...requestConfig,
        url: ARRHYTHMIA_DETECTION_URL
      }).catch(error => {
        console.error("Arrhythmia Detection Error:", error);
        toast.error("Error analyzing with Arrhythmia detection model");
        return { data: null };
      })
    ]);
    
    // Store the results
    if (ecgResponse.data) {
      results.ecgDetection = {
        ...ecgResponse.data,
        model: "ECG Detection"
      };
    }
    
    if (arrhythmiaResponse.data) {
      results.arrhythmiaDetection = {
        ...arrhythmiaResponse.data,
        model: "Arrhythmia Detection"
      };
    }
    
    // Check if both requests failed
    if (!results.ecgDetection && !results.arrhythmiaDetection) {
      results.hasError = true;
      toast.error("Failed to analyze ECG with both models");
    } else if (results.ecgDetection && results.arrhythmiaDetection) {
      toast.success("Analysis complete with both models");
    } else {
      toast.info("Analysis complete with one model");
    }
    
    return results;
  } catch (error) {
    console.error("Analysis Error:", error);
    toast.error("An error occurred during ECG analysis");
    return {
      ecgDetection: null,
      arrhythmiaDetection: null,
      hasError: true
    };
  }
};
