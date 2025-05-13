
import axios from "axios";
import { toast } from "sonner";

// Constants for the API endpoints
const ECG_DETECTION_URL = "https://serverless.roboflow.com/ecg-detection/3";
const ARRHYTHMIA_DETECTION_URL = "https://serverless.roboflow.com/arrhythmia_detection/1";
const ECG_CLASSIFICATION_URL = "https://serverless.roboflow.com/ecg-classif/1";
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
  ecgClassification: DetectionResult | null;
  hasError: boolean;
}

/**
 * Analyze an image using all three ECG detection models
 */
export const analyzeECG = async (base64Image: string): Promise<CombinedResults> => {
  try {
    // Prepare the results object
    const results: CombinedResults = {
      ecgDetection: null,
      arrhythmiaDetection: null,
      ecgClassification: null,
      hasError: false
    };
    
    toast.info("Starting analysis with all three models...");
    
    // Create common request configuration
    const requestConfig = {
      method: "POST",
      params: { api_key: API_KEY },
      data: base64Image,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    
    // Send requests to all three models in parallel and wait for all to complete
    const [ecgResponse, arrhythmiaResponse, classificationResponse] = await Promise.all([
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
      }),
      
      axios({
        ...requestConfig,
        url: ECG_CLASSIFICATION_URL
      }).catch(error => {
        console.error("ECG Classification Error:", error);
        toast.error("Error analyzing with ECG classification model");
        return { data: null };
      })
    ]);
    
    // Store the results - ensure all predictions are processed consistently
    if (ecgResponse.data) {
      // Ensure predictions is always an array
      results.ecgDetection = {
        ...ecgResponse.data,
        model: "ECG Detection",
        predictions: Array.isArray(ecgResponse.data.predictions) 
          ? ecgResponse.data.predictions 
          : []
      };
      
      // Standardize image dimensions if needed
      if (results.ecgDetection.image) {
        // Store original dimensions for reference
        console.log("ECG Detection image dimensions:", 
          results.ecgDetection.image.width, 
          results.ecgDetection.image.height
        );
      }
    }
    
    if (arrhythmiaResponse.data) {
      // Ensure predictions is always an array
      results.arrhythmiaDetection = {
        ...arrhythmiaResponse.data,
        model: "Arrhythmia Detection",
        predictions: Array.isArray(arrhythmiaResponse.data.predictions) 
          ? arrhythmiaResponse.data.predictions 
          : []
      };
      
      // Standardize image dimensions if needed
      if (results.arrhythmiaDetection.image) {
        // Store original dimensions for reference
        console.log("Arrhythmia Detection image dimensions:", 
          results.arrhythmiaDetection.image.width, 
          results.arrhythmiaDetection.image.height
        );
      }
    }
    
    if (classificationResponse.data) {
      // Ensure predictions is always an array
      results.ecgClassification = {
        ...classificationResponse.data,
        model: "ECG Classification",
        predictions: Array.isArray(classificationResponse.data.predictions) 
          ? classificationResponse.data.predictions 
          : []
      };
      
      // Standardize image dimensions if needed
      if (results.ecgClassification.image) {
        // Store original dimensions for reference
        console.log("Classification image dimensions:", 
          results.ecgClassification.image.width, 
          results.ecgClassification.image.height
        );
      }
    }
    
    // Check if all requests failed
    if (!results.ecgDetection && !results.arrhythmiaDetection && !results.ecgClassification) {
      results.hasError = true;
      toast.error("Failed to analyze ECG with all models");
    } else {
      const successfulModels = [
        results.ecgDetection && "ECG Detection", 
        results.arrhythmiaDetection && "Arrhythmia Detection",
        results.ecgClassification && "ECG Classification"
      ].filter(Boolean);
      
      if (successfulModels.length === 3) {
        toast.success("Analysis complete with all models");
      } else {
        toast.info(`Analysis complete with ${successfulModels.length} of 3 models`);
      }
    }
    
    return results;
  } catch (error) {
    console.error("Analysis Error:", error);
    toast.error("An error occurred during ECG analysis");
    return {
      ecgDetection: null,
      arrhythmiaDetection: null,
      ecgClassification: null,
      hasError: true
    };
  }
};
