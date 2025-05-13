
import { CombinedResults, DetectionResult } from "./roboflowService";

// Interface for consolidated analysis result
export interface ConsolidatedResult {
  condition: string;
  confidence: number;
  sourcedFrom: string;
}

/**
 * Consolidates analysis results from all models according to these rules:
 * 1. If all results are "normal", show the "normal" with highest percentage
 * 2. If any result is abnormal (not "normal"), prioritize that result
 * 3. Ignore any "no abnormalities detected" results
 */
export const consolidateResults = (results: CombinedResults): ConsolidatedResult | null => {
  const { ecgDetection, arrhythmiaDetection, model7n51b, modelVbbkz } = results;
  
  // If no valid results, return null
  if (!ecgDetection && !arrhythmiaDetection && !model7n51b && !modelVbbkz) {
    return null;
  }

  // Collect all predictions from all models
  const allPredictions: Array<{
    prediction: any;
    sourcedFrom: string;
  }> = [];

  // Helper function to add valid predictions to our collection
  const addPredictions = (result: DetectionResult | null, modelName: string) => {
    if (result && Array.isArray(result.predictions)) {
      result.predictions.forEach(pred => {
        // Skip predictions that explicitly state "no abnormalities detected"
        if (pred.class.toLowerCase().includes("no abnormalities")) {
          return;
        }
        
        allPredictions.push({
          prediction: pred,
          sourcedFrom: modelName
        });
      });
    }
  };

  // Add predictions from all models
  addPredictions(ecgDetection, "ECG Detection");
  addPredictions(arrhythmiaDetection, "Arrhythmia Detection");
  addPredictions(model7n51b, "Model 7n51b");
  addPredictions(modelVbbkz, "Model VBBKZ");

  // If no valid predictions found
  if (allPredictions.length === 0) {
    return {
      condition: "Normal",
      confidence: 100,
      sourcedFrom: "All Models"
    };
  }

  // Find any non-normal predictions
  const abnormalResults = allPredictions.filter(
    item => !item.prediction.class.toLowerCase().includes("normal")
  );

  // If there are abnormal results, prioritize the one with highest confidence
  if (abnormalResults.length > 0) {
    // Sort by confidence (highest first)
    abnormalResults.sort((a, b) => b.prediction.confidence - a.prediction.confidence);
    
    return {
      condition: abnormalResults[0].prediction.class,
      confidence: abnormalResults[0].prediction.confidence * 100, // Convert to percentage
      sourcedFrom: abnormalResults[0].sourcedFrom
    };
  } else {
    // All results are normal, find the one with highest confidence
    const normalResults = allPredictions.filter(
      item => item.prediction.class.toLowerCase().includes("normal")
    );
    
    if (normalResults.length > 0) {
      // Sort by confidence (highest first)
      normalResults.sort((a, b) => b.prediction.confidence - a.prediction.confidence);
      
      return {
        condition: normalResults[0].prediction.class,
        confidence: normalResults[0].prediction.confidence * 100, // Convert to percentage
        sourcedFrom: normalResults[0].sourcedFrom
      };
    }
  }

  // Fallback case (should rarely happen)
  return null;
};
