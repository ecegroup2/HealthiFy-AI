
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  
  // Process the selected file
  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass the file to parent component
    onImageSelected(file);
  };
  
  // Handle click on the upload area
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  // Clear the selected image
  const clearImage = () => {
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full pt-4">
      <CardContent className="p-4">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isAnalyzing}
        />
        
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            previewUrl ? "bg-background" : "bg-muted/50",
            isAnalyzing && "opacity-50 cursor-not-allowed"
          )}
          onClick={isAnalyzing ? undefined : handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="ECG Preview" 
                className="w-full max-h-[300px] object-contain rounded" 
              />
              {!isAnalyzing && (
                <button 
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-white hover:bg-destructive/80 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="mt-2 font-medium text-primary">
                  Drag and drop an ECG image
                </div>
                <p className="text-sm text-muted-foreground">
                  or click to select a file (PNG, JPG, JPEG)
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                className="mt-4"
                disabled={isAnalyzing}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload ECG
              </Button>
            </>
          )}
          
          {dragActive && (
            <div className="absolute inset-0 w-full h-full rounded-lg bg-primary/10 z-10 pointer-events-none" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
