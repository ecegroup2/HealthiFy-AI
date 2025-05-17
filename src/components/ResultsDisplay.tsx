
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetectionResult } from '@/utils/roboflowService';
import { drawDetections } from '@/utils/imageUtils';
import { consolidateResults } from '@/utils/analysisUtils';
import { GeminiResult } from '@/utils/geminiService';
import { Activity, Brain, Sparkles, Check, AlertCircle } from 'lucide-react';

interface ResultsDisplayProps {
  imageBase64: string | null;
  results: {
    ecgDetection: DetectionResult | null;
    arrhythmiaDetection: DetectionResult | null;
    model7n51b: DetectionResult | null;
    modelVbbkz: DetectionResult | null;
    geminiResult?: GeminiResult | null;
    hasError: boolean;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageBase64, results }) => {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isNormal, setIsNormal] = useState<boolean>(true);
  
  // Process results to determine if ECG is normal
  useEffect(() => {
    if (results.geminiResult) {
      const conditionLower = results.geminiResult.condition.toLowerCase();
      setIsNormal(
        conditionLower.includes('normal') || 
        conditionLower.includes('no abnormalities') || 
        conditionLower.includes('healthy')
      );
    }
  }, [results]);
  
  useEffect(() => {
    if (!imageBase64) return;
    
    // Make sure we have results before rendering
    if (!results.geminiResult) return;
    
    const image = new Image();
    image.onload = () => {
      // Draw ECG image on canvas
      if (ecgCanvasRef.current) {
        const ctx = ecgCanvasRef.current.getContext('2d');
        if (ctx) {
          // Set standard dimensions
          ecgCanvasRef.current.width = 600;
          ecgCanvasRef.current.height = 400;
          
          // Clear canvas
          ctx.clearRect(0, 0, ecgCanvasRef.current.width, ecgCanvasRef.current.height);
          
          // Draw the image centered and resized to fit
          const imgRatio = image.width / image.height;
          const canvasRatio = ecgCanvasRef.current.width / ecgCanvasRef.current.height;
          
          let drawWidth, drawHeight, offsetX, offsetY;
          
          if (imgRatio > canvasRatio) {
            // Image is wider than canvas ratio
            drawWidth = ecgCanvasRef.current.width;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (ecgCanvasRef.current.height - drawHeight) / 2;
          } else {
            // Image is taller than canvas ratio
            drawHeight = ecgCanvasRef.current.height;
            drawWidth = drawHeight * imgRatio;
            offsetX = (ecgCanvasRef.current.width - drawWidth) / 2;
            offsetY = 0;
          }
          
          ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    };
    
    image.src = `data:image/jpeg;base64,${imageBase64}`;
  }, [imageBase64, results]);
  
  // No results to display
  if (!imageBase64 || !results.geminiResult) {
    return null;
  }
  
  return (
    <Card className="w-full mt-6 bg-[#0f1729] text-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          AI Analysis Results
          {isNormal ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              No Significant Abnormalities Detected
            </Badge>
          ) : (
            <Badge variant="destructive">
              Abnormalities Detected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Gemini Analysis Section */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg">
          <h3 className="text-lg font-medium text-purple-200 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Gemini 2.5 Pro Analysis Results
          </h3>
          
          <div className="mb-4 flex items-center">
            {isNormal ? (
              <div className="flex items-center gap-2 text-green-400">
                <Check className="h-6 w-6" />
                <span className="text-xl font-medium">{results.geminiResult.condition}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-6 w-6" />
                <span className="text-xl font-medium">{results.geminiResult.condition}</span>
              </div>
            )}
            
            <Badge className={
              results.geminiResult.confidence > 70 
                ? "ml-3 bg-purple-900/50 text-purple-200 border-purple-500/50" 
                : "ml-3 bg-blue-900/50 text-blue-200 border-blue-500/50"
            }>
              {results.geminiResult.confidence}% Confidence
            </Badge>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 mb-6">
            <p className="text-gray-200">
              {results.geminiResult.explanation}
            </p>
          </div>
          
          {/* ECG Visualization */}
          <div className="w-full">
            <h4 className="text-md font-medium text-gray-300 mb-2">Your ECG:</h4>
            <canvas
              ref={ecgCanvasRef}
              width={600}
              height={400}
              className="w-full border border-gray-700 rounded bg-black/40"
            />
          </div>
        </div>
        
        <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg text-center">
          <p className="text-sm text-gray-400">
            Note: This analysis is provided by AI and should not replace professional medical advice. 
            Please consult a healthcare professional for proper diagnosis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
