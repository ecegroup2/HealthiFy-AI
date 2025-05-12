
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Activity } from "lucide-react";
import ImageUpload from './ImageUpload';
import ResultsDisplay from './ResultsDisplay';
import { fileToBase64 } from '@/utils/imageUtils';
import { analyzeECG, CombinedResults } from '@/utils/roboflowService';

const ECGAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [results, setResults] = useState<CombinedResults>({
    ecgDetection: null,
    arrhythmiaDetection: null,
    hasError: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Handle file selection
  const handleImageSelected = async (file: File) => {
    setSelectedFile(file);
    try {
      const base64 = await fileToBase64(file);
      setImageBase64(base64);
      // Reset results when a new image is selected
      setResults({
        ecgDetection: null,
        arrhythmiaDetection: null,
        hasError: false
      });
    } catch (error) {
      console.error("Error converting file to base64:", error);
      toast.error("Failed to process the selected image");
    }
  };
  
  // Start analysis
  const handleAnalyze = async () => {
    if (!imageBase64) {
      toast.error("Please select an ECG image to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    try {
      toast.info("Analyzing ECG image with AI models...");
      const analysisResults = await analyzeECG(imageBase64);
      setResults(analysisResults);
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("An error occurred during analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">ECG Analyzer</CardTitle>
            <CardDescription>
              Upload an ECG image for AI-powered abnormality detection
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Our system uses two specialized AI models to analyze ECG images and detect potential abnormalities.
            The analysis includes both general ECG detection and specialized arrhythmia detection.
          </p>
          
          <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleAnalyze} 
              disabled={!imageBase64 || isAnalyzing}
              className="px-8"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze ECG"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <ResultsDisplay imageBase64={imageBase64} results={results} />
    </div>
  );
};

export default ECGAnalyzer;
