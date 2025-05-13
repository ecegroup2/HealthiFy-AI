
import axios from "axios";
import { toast } from "sonner";

// Constants for the API endpoints
const ECG_DETECTION_URL = "https://serverless.roboflow.com/ecg-detection/3";
const ARRHYTHMIA_DETECTION_URL = "https://serverless.roboflow.com/arrhythmia_detection/1";
const MODEL_VBBKZ_URL = "https://serverless.roboflow.com/model-vbbkz/2";
const MODEL_7N51B_URL = "https://serverless.roboflow.com/model-7n51b/1"; // New model replacing ECG Classification
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
  model7n51b: DetectionResult | null; // Changed from ecgClassification to model7n51b
  modelVbbkz: DetectionResult | null;
  hasError: boolean;
}

/**
 * Analyze an image using all four ECG detection models
 */
export const analyzeECG = async (base64Image: string): Promise<CombinedResults> => {
  try {
    // Prepare the results object
    const results: CombinedResults = {
      ecgDetection: null,
      arrhythmiaDetection: null,
      model7n51b: null, // Changed from ecgClassification to model7n51b
      modelVbbkz: null,
      hasError: false
    };
    
    toast.info("Starting analysis with all four models...");
    
    // Create common request configuration
    const requestConfig = {
      method: "POST",
      params: { api_key: API_KEY },
      data: base64Image,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    
    // Send requests to all four models in parallel and wait for all to complete
    const [ecgResponse, arrhythmiaResponse, model7n51bResponse, vbbkzResponse] = await Promise.all([
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
        url: MODEL_7N51B_URL // Changed from ECG_CLASSIFICATION_URL to MODEL_7N51B_URL
      }).catch(error => {
        console.error("Model 7n51b Error:", error); // Updated error message
        toast.error("Error analyzing with Model 7n51b"); // Updated toast message
        return { data: null };
      }),
      
      axios({
        ...requestConfig,
        url: MODEL_VBBKZ_URL
      }).catch(error => {
        console.error("Model VBBKZ Error:", error);
        toast.error("Error analyzing with Model VBBKZ");
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
    
    if (model7n51bResponse.data) {
      // Ensure predictions is always an array
      results.model7n51b = {
        ...model7n51bResponse.data,
        model: "Model 7n51b",
        predictions: Array.isArray(model7n51bResponse.data.predictions) 
          ? model7n51bResponse.data.predictions 
          : []
      };
      
      // Standardize image dimensions if needed
      if (results.model7n51b.image) {
        // Store original dimensions for reference
        console.log("Model 7n51b image dimensions:", 
          results.model7n51b.image.width, 
          results.model7n51b.image.height
        );
      }
    }
    
    if (vbbkzResponse.data) {
      // Ensure predictions is always an array
      results.modelVbbkz = {
        ...vbbkzResponse.data,
        model: "Model VBBKZ",
        predictions: Array.isArray(vbbkzResponse.data.predictions) 
          ? vbbkzResponse.data.predictions 
          : []
      };
      
      // Standardize image dimensions if needed
      if (results.modelVbbkz.image) {
        // Store original dimensions for reference
        console.log("Model VBBKZ image dimensions:", 
          results.modelVbbkz.image.width, 
          results.modelVbbkz.image.height
        );
      }
    }
    
    // Check if all requests failed
    if (!results.ecgDetection && !results.arrhythmiaDetection && !results.model7n51b && !results.modelVbbkz) {
      results.hasError = true;
      toast.error("Failed to analyze ECG with all models");
    } else {
      const successfulModels = [
        results.ecgDetection && "ECG Detection", 
        results.arrhythmiaDetection && "Arrhythmia Detection",
        results.model7n51b && "Model 7n51b", // Updated model name
        results.modelVbbkz && "Model VBBKZ"
      ].filter(Boolean);
      
      if (successfulModels.length === 4) {
        toast.success("Analysis complete with all models");
      } else {
        toast.info(`Analysis complete with ${successfulModels.length} of 4 models`);
      }
    }
    
    return results;
  } catch (error) {
    console.error("Analysis Error:", error);
    toast.error("An error occurred during ECG analysis");
    return {
      ecgDetection: null,
      arrhythmiaDetection: null,
      model7n51b: null, // Changed from ecgClassification to model7n51b
      modelVbbkz: null,
      hasError: true
    };
  }
};
