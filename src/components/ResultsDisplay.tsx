
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetectionResult } from '@/utils/roboflowService';
import { drawDetections } from '@/utils/imageUtils';

interface ResultsDisplayProps {
  imageBase64: string | null;
  results: {
    ecgDetection: DetectionResult | null;
    arrhythmiaDetection: DetectionResult | null;
    hasError: boolean;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageBase64, results }) => {
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const arrhythmiaCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw results when they change
  useEffect(() => {
    if (!imageBase64) return;
    
    const image = new Image();
    image.onload = () => {
      // Draw ECG detection results if available
      if (results.ecgDetection && ecgCanvasRef.current) {
        const ctx = ecgCanvasRef.current.getContext('2d');
        if (ctx) {
          drawDetections(
            ctx,
            image,
            results.ecgDetection.predictions,
            ecgCanvasRef.current.width,
            ecgCanvasRef.current.height
          );
        }
      }
      
      // Draw arrhythmia detection results if available
      if (results.arrhythmiaDetection && arrhythmiaCanvasRef.current) {
        const ctx = arrhythmiaCanvasRef.current.getContext('2d');
        if (ctx) {
          drawDetections(
            ctx,
            image,
            results.arrhythmiaDetection.predictions,
            arrhythmiaCanvasRef.current.width,
            arrhythmiaCanvasRef.current.height
          );
        }
      }
    };
    
    image.src = `data:image/jpeg;base64,${imageBase64}`;
  }, [imageBase64, results]);
  
  // No results to display
  if (!imageBase64 || (!results.ecgDetection && !results.arrhythmiaDetection)) {
    return null;
  }
  
  // Helper to render prediction list
  const renderPredictionList = (predictions: any[] | undefined) => {
    if (!predictions || predictions.length === 0) {
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
  
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          Analysis Results
          {(results.ecgDetection?.predictions.length || 0) + 
           (results.arrhythmiaDetection?.predictions.length || 0) > 0 ? (
            <Badge variant="destructive">Abnormalities Detected</Badge>
          ) : (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              No Abnormalities
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="visual">Visual Analysis</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="mt-4 space-y-4">
            {results.ecgDetection && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">ECG Detection Model</h3>
                <canvas
                  ref={ecgCanvasRef}
                  width={600}
                  height={400}
                  className="w-full border rounded bg-white"
                />
              </div>
            )}
            
            {results.arrhythmiaDetection && (
              <div className="space-y-2 mt-6">
                <h3 className="text-lg font-medium">Arrhythmia Detection Model</h3>
                <canvas
                  ref={arrhythmiaCanvasRef}
                  width={600}
                  height={400}
                  className="w-full border rounded bg-white"
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="detailed" className="mt-4 space-y-6">
            {results.ecgDetection && (
              <div>
                <h3 className="text-lg font-medium mb-2">ECG Detection Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing time:</span>
                    <span>{results.ecgDetection.time.toFixed(2)} ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Image dimensions:</span>
                    <span>{results.ecgDetection.image.width}x{results.ecgDetection.image.height}</span>
                  </div>
                  <Separator className="my-2" />
                  <h4 className="font-medium">Detected Abnormalities:</h4>
                  {renderPredictionList(results.ecgDetection.predictions)}
                </div>
              </div>
            )}
            
            {results.arrhythmiaDetection && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Arrhythmia Detection Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing time:</span>
                    <span>{results.arrhythmiaDetection.time.toFixed(2)} ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Image dimensions:</span>
                    <span>{results.arrhythmiaDetection.image.width}x{results.arrhythmiaDetection.image.height}</span>
                  </div>
                  <Separator className="my-2" />
                  <h4 className="font-medium">Detected Abnormalities:</h4>
                  {renderPredictionList(results.arrhythmiaDetection.predictions)}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
