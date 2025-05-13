
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
    ecgClassification: null,
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
        ecgClassification: null,
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
      toast.info("Analyzing ECG image with advanced AI models...");
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
            <CardTitle className="text-2xl">Multi-Model ECG Analyzer</CardTitle>
            <CardDescription>
              Upload an ECG image for comprehensive AI-powered abnormality detection
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Our advanced system uses three specialized AI models to thoroughly analyze ECG images and detect potential abnormalities:
            <span className="block mt-2 ml-4">• ECG Detection - identifies general ECG features and patterns</span>
            <span className="block ml-4">• Arrhythmia Detection - specializes in detecting irregular heartbeats</span>
            <span className="block ml-4">• ECG Classification - classifies the ECG into different diagnostic categories</span>
          </p>
          
          <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleAnalyze} 
              disabled={!imageBase64 || isAnalyzing}
              className="px-8"
            >
              {isAnalyzing ? "Analyzing with 3 Models..." : "Analyze ECG"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <ResultsDisplay imageBase64={imageBase64} results={results} />
    </div>
  );
};

export default ECGAnalyzer;
