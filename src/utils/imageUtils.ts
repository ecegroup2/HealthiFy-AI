
/**
 * Convert a File object to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Create an image element from a base64 string
 */
export const base64ToImage = (base64: string, mimeType: string = 'image/jpeg'): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = `data:${mimeType};base64,${base64}`;
  });
};

/**
 * Draws detection boxes on a canvas based on prediction data
 */
export const drawDetections = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  predictions: any[],
  canvasWidth: number,
  canvasHeight: number
): void => {
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Calculate scaling factors
  const scaleX = canvasWidth / image.width;
  const scaleY = canvasHeight / image.height;
  const scale = Math.min(scaleX, scaleY);
  
  // Calculate centered position
  const offsetX = (canvasWidth - image.width * scale) / 2;
  const offsetY = (canvasHeight - image.height * scale) / 2;
  
  // Draw the image
  ctx.drawImage(
    image, 
    0, 0, image.width, image.height,
    offsetX, offsetY, image.width * scale, image.height * scale
  );
  
  // Draw bounding boxes for predictions
  predictions.forEach(prediction => {
    if (prediction.x !== undefined && prediction.y !== undefined && 
        prediction.width !== undefined && prediction.height !== undefined) {
      // Get prediction coordinates and dimensions
      const x = prediction.x - prediction.width / 2;
      const y = prediction.y - prediction.height / 2;
      
      // Calculate scaled coordinates
      const boxX = x * scale + offsetX;
      const boxY = y * scale + offsetY;
      const boxWidth = prediction.width * scale;
      const boxHeight = prediction.height * scale;
      
      // Box style based on confidence
      const confidence = prediction.confidence;
      const hue = (confidence * 120).toString(10); // Hue varies from red (0) to green (120) based on confidence
      
      // Draw rectangle
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      // Draw background for text
      ctx.fillStyle = `hsl(${hue}, 100%, 50%, 0.7)`;
      ctx.fillRect(boxX, boxY - 20, boxWidth, 20);
      
      // Draw text
      const label = `${prediction.class} (${Math.round(confidence * 100)}%)`;
      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(label, boxX + 5, boxY - 7);
    }
  });
};
