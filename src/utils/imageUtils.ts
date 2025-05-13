
/**
 * Convert a file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) {
        return reject(new Error("Failed to convert file to base64"));
      }
      // Extract the base64 string without the data URL prefix
      const base64 = reader.result.toString().split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Draw detection results on canvas with standardized dimensions
 */
export const drawDetections = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  predictions: any[] | undefined,
  canvasWidth: number,
  canvasHeight: number
): void => {
  if (!predictions || predictions.length === 0) {
    // If no predictions, just draw the image
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calculate scaling to fit the image properly
    const scale = Math.min(
      canvasWidth / image.width, 
      canvasHeight / image.height
    );
    
    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;
    
    // Center the image
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;
    
    ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
    return;
  }
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw the original image with proper scaling
  const scale = Math.min(
    canvasWidth / image.width, 
    canvasHeight / image.height
  );
  
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  
  // Center the image
  const offsetX = (canvasWidth - scaledWidth) / 2;
  const offsetY = (canvasHeight - scaledHeight) / 2;
  
  // Draw image
  ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
  
  // Draw predictions
  predictions.forEach(prediction => {
    // Only draw if it has bounding box information
    if (
      prediction.x !== undefined && 
      prediction.y !== undefined && 
      prediction.width !== undefined && 
      prediction.height !== undefined
    ) {
      // Calculate scaled coordinates
      const x = offsetX + (prediction.x * scaledWidth);
      const y = offsetY + (prediction.y * scaledHeight);
      const width = prediction.width * scaledWidth;
      const height = prediction.height * scaledHeight;
      
      // Set styles based on confidence
      const confidence = prediction.confidence;
      const alpha = Math.max(0.2, Math.min(0.8, confidence));
      
      // Draw rectangle
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(255, 0, 0, ${confidence})`;
      ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.3})`;
      
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      
      // Draw label
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      
      const label = `${prediction.class} ${Math.round(confidence * 100)}%`;
      const textMetrics = ctx.measureText(label);
      const textWidth = textMetrics.width;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(
        x, 
        y - 20, 
        textWidth + 10, 
        20
      );
      
      ctx.fillStyle = 'white';
      ctx.fillText(label, x + 5, y - 5);
    }
  });
};
