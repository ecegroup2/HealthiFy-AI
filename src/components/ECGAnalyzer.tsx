
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Activity, Upload, BarChart, Heart } from "lucide-react";
import ImageUpload from './ImageUpload';
import ResultsDisplay from './ResultsDisplay';
import { fileToBase64 } from '@/utils/imageUtils';
import { analyzeECG, CombinedResults, validateECGImage } from '@/utils/roboflowService';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ECGAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [results, setResults] = useState<CombinedResults>({
    ecgDetection: null,
    arrhythmiaDetection: null,
    model7n51b: null,
    modelVbbkz: null,
    hasError: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  
  // Handle file selection
  const handleImageSelected = async (file: File) => {
    setSelectedFile(file);
    setValidationError(null); // Reset any previous validation errors
    setActiveStep(1);
    try {
      const base64 = await fileToBase64(file);
      setImageBase64(base64);
      // Reset results when a new image is selected
      setResults({
        ecgDetection: null,
        arrhythmiaDetection: null,
        model7n51b: null,
        modelVbbkz: null,
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
    setValidationError(null);
    setActiveStep(2);
    
    try {
      // First validate if the image is an ECG image
      toast.info("Validating image...");
      const isECGImage = await validateECGImage(imageBase64);
      
      if (!isECGImage) {
        setValidationError("The uploaded image does not appear to be an ECG. Please upload a valid ECG image.");
        toast.error("Invalid image type detected");
        setIsAnalyzing(false);
        setActiveStep(1);
        return;
      }
      
      // If validation passes, proceed with analysis
      toast.info("Analyzing ECG image with advanced AI models...");
      const analysisResults = await analyzeECG(imageBase64);
      
      setResults(analysisResults);
      
      setActiveStep(3);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("An error occurred during analysis");
      setActiveStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-6 bg-[#0f1729] text-white border-none shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              ECG Analysis
            </CardTitle>
            <p className="text-gray-400 mt-1 text-sm">
              Upload an ECG image to analyze heart health indicators
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Progress Steps */}
          <div className="grid grid-cols-3 text-center border-y border-gray-700">
            <div className={`py-4 flex flex-col items-center ${activeStep === 1 ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-400'}`}>
              <span className="text-xs mb-1">STEP 1</span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> Upload
              </span>
            </div>
            <div className={`py-4 flex flex-col items-center ${activeStep === 2 ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}>
              <span className="text-xs mb-1">STEP 2</span>
              <span className="flex items-center gap-1">
                <Activity className="h-4 w-4" /> Analyze
              </span>
            </div>
            <div className={`py-4 flex flex-col items-center ${activeStep === 3 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}>
              <span className="text-xs mb-1">STEP 3</span>
              <span className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Results
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {validationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Invalid Image</AlertTitle>
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex items-center mb-4 gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-medium">Upload ECG Image</h3>
            </div>
            
            <div className="border border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
              <div className="bg-blue-500/10 p-3 rounded-full mb-4">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-gray-300 mb-1">Drag and drop your ECG image here</p>
              <p className="text-gray-500 text-sm mb-4">Or click to select a file</p>
              <p className="text-gray-500 text-xs mb-2">Supported formats: JPG, PNG, GIF (Max: 5MB)</p>
              <div className="bg-gray-800 rounded-full px-4 py-1 text-xs text-gray-300">
                Supports both labeled and non-labeled ECG formats
              </div>
              
              <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={isAnalyzing} />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center text-gray-400 text-sm">
                <Activity className="h-4 w-4 mr-1" />
                <span>For ECG Analysis</span>
              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={!imageBase64 || isAnalyzing || validationError !== null}
                className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-8 rounded-full hover:opacity-90 transition-all"
              >
                {isAnalyzing ? "Analyzing..." : "Continue"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {activeStep === 3 && (
        <ResultsDisplay imageBase64={imageBase64} results={results} />
      )}
    </div>
  );
};

export default ECGAnalyzer;
