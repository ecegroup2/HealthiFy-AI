
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetectionResult } from '@/utils/roboflowService';
import { drawDetections } from '@/utils/imageUtils';
import { consolidateResults, ConsolidatedResult } from '@/utils/analysisUtils';
import { Activity, Brain } from 'lucide-react';

interface ResultsDisplayProps {
  imageBase64: string | null;
  results: {
    ecgDetection: DetectionResult | null;
    arrhythmiaDetection: DetectionResult | null;
    model7n51b: DetectionResult | null;
    modelVbbkz: DetectionResult | null;
    hasError: boolean;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageBase64, results }) => {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const arrhythmiaCanvasRef = useRef<HTMLCanvasElement>(null);
  const model7n51bCanvasRef = useRef<HTMLCanvasElement>(null);
  const vbbkzCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for consolidated result
  const [consolidatedResult, setConsolidatedResult] = useState<ConsolidatedResult | null>(null);
  
  // Standardize canvas dimensions for all models
  const standardWidth = 400;
  const standardHeight = 300;
  
  // Process consolidated results when results change
  useEffect(() => {
    const consolidated = consolidateResults(results);
    setConsolidatedResult(consolidated);
  }, [results]);
  
  useEffect(() => {
    if (!imageBase64) return;
    
    // Make sure we have results from all models before rendering
    // or display what we have if at least one model has processed the image
    const hasAnyResult = results.ecgDetection || results.arrhythmiaDetection || 
                        results.model7n51b || results.modelVbbkz;
    if (!hasAnyResult) return;
    
    const image = new Image();
    image.onload = () => {
      // Draw ECG detection results if available
      if (results.ecgDetection && ecgCanvasRef.current) {
        const ctx = ecgCanvasRef.current.getContext('2d');
        if (ctx) {
          // Ensure canvas has standard dimensions
          ecgCanvasRef.current.width = standardWidth;
          ecgCanvasRef.current.height = standardHeight;
          
          drawDetections(
            ctx,
            image,
            results.ecgDetection.predictions,
            standardWidth,
            standardHeight
          );
        }
      }
      
      // Draw arrhythmia detection results if available
      if (results.arrhythmiaDetection && arrhythmiaCanvasRef.current) {
        const ctx = arrhythmiaCanvasRef.current.getContext('2d');
        if (ctx) {
          // Ensure canvas has standard dimensions
          arrhythmiaCanvasRef.current.width = standardWidth;
          arrhythmiaCanvasRef.current.height = standardHeight;
          
          drawDetections(
            ctx,
            image,
            results.arrhythmiaDetection.predictions,
            standardWidth,
            standardHeight
          );
        }
      }
      
      // Draw Model 7n51b results if available
      if (results.model7n51b && model7n51bCanvasRef.current) {
        const ctx = model7n51bCanvasRef.current.getContext('2d');
        if (ctx) {
          // Ensure canvas has standard dimensions
          model7n51bCanvasRef.current.width = standardWidth;
          model7n51bCanvasRef.current.height = standardHeight;
          
          drawDetections(
            ctx,
            image,
            results.model7n51b.predictions,
            standardWidth,
            standardHeight
          );
        }
      }
      
      // Draw VBBKZ model results if available
      if (results.modelVbbkz && vbbkzCanvasRef.current) {
        const ctx = vbbkzCanvasRef.current.getContext('2d');
        if (ctx) {
          // Ensure canvas has standard dimensions
          vbbkzCanvasRef.current.width = standardWidth;
          vbbkzCanvasRef.current.height = standardHeight;
          
          drawDetections(
            ctx,
            image,
            results.modelVbbkz.predictions,
            standardWidth,
            standardHeight
          );
        }
      }
    };
    
    image.src = `data:image/jpeg;base64,${imageBase64}`;
  }, [imageBase64, results]);
  
  // Helper to render prediction list
  const renderPredictionList = (predictions: any[] | undefined) => {
    // Check if predictions is an array before using map
    if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
      return <p className="text-muted-foreground">No abnormalities detected</p>;
    }
    
    return (
      <div className="space-y-2">
        {predictions.map((prediction, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`${prediction.confidence > 0.7 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}
              >
                {Math.round(prediction.confidence * 100)}%
              </Badge>
              <span className="font-medium">{prediction.class}</span>
            </div>
            {prediction.x !== undefined && (
              <span className="text-xs text-muted-foreground">
                at position ({Math.round(prediction.x)}, {Math.round(prediction.y)})
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // No results to display
  if (!imageBase64 || (!results.ecgDetection && !results.arrhythmiaDetection && 
      !results.model7n51b && !results.modelVbbkz)) {
    return null;
  }
  
  // Calculate total abnormalities detected
  const totalAbnormalities = 
    (results.ecgDetection?.predictions && Array.isArray(results.ecgDetection.predictions) ? results.ecgDetection.predictions.length : 0) + 
    (results.arrhythmiaDetection?.predictions && Array.isArray(results.arrhythmiaDetection.predictions) ? results.arrhythmiaDetection.predictions.length : 0) +
    (results.model7n51b?.predictions && Array.isArray(results.model7n51b.predictions) ? results.model7n51b.predictions.length : 0) +
    (results.modelVbbkz?.predictions && Array.isArray(results.modelVbbkz.predictions) ? results.modelVbbkz.predictions.length : 0);
  
  return (
    <Card className="w-full mt-6 bg-[#0f1729] text-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Analysis Results
{/*           {totalAbnormalities > 0 ? (
            <Badge variant="destructive">
              {totalAbnormalities} {totalAbnormalities === 1 ? 'Abnormality' : 'Abnormalities'} Detected
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              No Abnormalities
            </Badge>
          )} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Consolidated Result Section */}
        {consolidatedResult && (
          <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-400" />
              Multi-Model Consolidated Analysis
            </h3>
            <div className="flex items-center gap-3">
              <Badge 
                className={
                  consolidatedResult.condition.toLowerCase().includes("normal") 
                    ? "bg-green-900/50 text-green-200 border-green-500/50" 
                    : "bg-red-900/50 text-red-200 border-red-500/50"
                }
              >
                {Math.round(consolidatedResult.confidence)}%
              </Badge>
              <span className="font-medium text-lg">{consolidatedResult.condition}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Source: {consolidatedResult.sourcedFrom}
            </p>
          </div>
        )}

        <Tabs defaultValue="visual" className="text-white">
          <TabsList className="w-full grid grid-cols-2 bg-gray-800">
            <TabsTrigger value="visual" className="data-[state=active]:bg-gray-700">Visual Analysis</TabsTrigger>
            <TabsTrigger value="detailed" className="data-[state=active]:bg-gray-700">Detailed Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.ecgDetection && (
                <div className="space-y-2 col-span-1">
                  <h3 className="text-lg font-medium">ECG Detection Model</h3>
                  <canvas
                    ref={ecgCanvasRef}
                    width={standardWidth}
                    height={standardHeight}
                    className="w-full border border-gray-700 rounded bg-black/50"
                  />
                </div>
              )}
              
              {results.arrhythmiaDetection && (
                <div className="space-y-2 col-span-1">
                  <h3 className="text-lg font-medium">Arrhythmia Detection</h3>
                  <canvas
                    ref={arrhythmiaCanvasRef}
                    width={standardWidth}
                    height={standardHeight}
                    className="w-full border border-gray-700 rounded bg-black/50"
                  />
                </div>
              )}
              
              {results.model7n51b && (
                <div className="space-y-2 col-span-1">
                  <h3 className="text-lg font-medium">Model 7n51b</h3>
                  <canvas
                    ref={model7n51bCanvasRef}
                    width={standardWidth}
                    height={standardHeight}
                    className="w-full border border-gray-700 rounded bg-black/50"
                  />
                </div>
              )}
              
              {results.modelVbbkz && (
                <div className="space-y-2 col-span-1">
                  <h3 className="text-lg font-medium">Model VBBKZ</h3>
                  <canvas
                    ref={vbbkzCanvasRef}
                    width={standardWidth}
                    height={standardHeight}
                    className="w-full border border-gray-700 rounded bg-black/50"
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="mt-4 mb-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.ecgDetection && (
                <div>
                  <h3 className="text-lg font-medium mb-2">ECG Detection Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing time:</span>
                      <span>{results.ecgDetection.time.toFixed(2)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Image dimensions:</span>
                      <span>{results.ecgDetection.image.width}x{results.ecgDetection.image.height}</span>
                    </div>
                    <Separator className="my-2 bg-gray-700" />
                    <h4 className="font-medium">Detected Abnormalities:</h4>
                    {renderPredictionList(results.ecgDetection.predictions)}
                  </div>
                </div>
              )}
              
              {results.arrhythmiaDetection && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Arrhythmia Detection Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing time:</span>
                      <span>{results.arrhythmiaDetection.time.toFixed(2)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Image dimensions:</span>
                      <span>{results.arrhythmiaDetection.image.width}x{results.arrhythmiaDetection.image.height}</span>
                    </div>
                    <Separator className="my-2 bg-gray-700" />
                    <h4 className="font-medium">Detected Abnormalities:</h4>
                    {renderPredictionList(results.arrhythmiaDetection.predictions)}
                  </div>
                </div>
              )}
              
              {results.model7n51b && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Model 7n51b Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing time:</span>
                      <span>{results.model7n51b.time.toFixed(2)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Image dimensions:</span>
                      <span>{results.model7n51b.image.width}x{results.model7n51b.image.height}</span>
                    </div>
                    <Separator className="my-2 bg-gray-700" />
                    <h4 className="font-medium">Detected Abnormalities:</h4>
                    {renderPredictionList(results.model7n51b.predictions)}
                  </div>
                </div>
              )}
              
              {results.modelVbbkz && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Model VBBKZ Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing time:</span>
                      <span>{results.modelVbbkz.time.toFixed(2)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Image dimensions:</span>
                      <span>{results.modelVbbkz.image.width}x{results.modelVbbkz.image.height}</span>
                    </div>
                    <Separator className="my-2 bg-gray-700" />
                    <h4 className="font-medium">Detected Abnormalities:</h4>
                    {renderPredictionList(results.modelVbbkz.predictions)}
                  </div>
                </div>
              )}
            </div>
            
{/*             {totalAbnormalities > 0 && (
              <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-md">
                <h3 className="text-lg font-medium text-yellow-300">Combined Analysis</h3>
                <p className="text-yellow-200/80 mt-1">
                  {totalAbnormalities} potential abnormalities detected across {[
                    results.ecgDetection && 'ECG Detection',
                    results.arrhythmiaDetection && 'Arrhythmia Detection',
                    results.model7n51b && 'Model 7n51b',
                    results.modelVbbkz && 'Model VBBKZ'
                  ].filter(Boolean).join(', ')} models.
                </p>
              </div>
            )} */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
