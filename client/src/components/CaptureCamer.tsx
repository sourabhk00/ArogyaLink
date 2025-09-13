import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  disabled?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export default function CameraCapture({
  onCapture,
  disabled = false,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8,
}: CameraCaptureProps) {
  const { toast } = useToast();
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: maxWidth },
          height: { ideal: maxHeight },
          facingMode: 'environment', // Use back camera on mobile
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Failed to access camera. Please check permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [maxWidth, maxHeight, toast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setCapturedImage(null);
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to blob and create file
    canvas.toBlob((blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `capture-${timestamp}.jpg`, { type: 'image/jpeg' });
        
        // Create preview URL
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        
        onCapture(file);
        stopCamera();
      }
    }, 'image/jpeg', quality);
  }, [isStreaming, onCapture, quality, stopCamera]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    startCamera();
  }, [capturedImage, startCamera]);

  const useCapturedImage = useCallback(() => {
    // Image is already passed to onCapture, just need to clean up
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    setCapturedImage(null);
    toast({
      title: "Image Captured",
      description: "Image has been captured and will be processed",
    });
  }, [capturedImage, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [stopCamera, capturedImage]);

  return (
    <div className="space-y-4" data-testid="camera-capture-component">
      {/* Camera Preview */}
      <div className="camera-preview">
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover rounded-lg"
            data-testid="captured-image"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isStreaming ? 'block' : 'hidden'}`}
              data-testid="camera-video"
            />
            {!isStreaming && (
              <div className="w-full h-full flex items-center justify-center">
                {isLoading ? (
                  <div className="text-center">
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Starting camera...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <i className="fas fa-camera text-4xl text-muted-foreground mb-4"></i>
                    <p className="text-muted-foreground">Camera preview will appear here</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Camera Overlay for better UX */}
        {isStreaming && !capturedImage && (
          <div className="camera-overlay">
            <div className="absolute inset-4 border-2 border-white/50 rounded-lg pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-3">
        {!isStreaming && !capturedImage && (
          <Button
            onClick={startCamera}
            disabled={disabled || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-start-camera"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Starting...
              </>
            ) : (
              <>
                <i className="fas fa-camera mr-2"></i>
                Open Camera
              </>
            )}
          </Button>
        )}

        {isStreaming && !capturedImage && (
          <>
            <Button
              onClick={captureImage}
              disabled={disabled}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              data-testid="button-capture"
            >
              <i className="fas fa-camera mr-2"></i>
              Capture
            </Button>
            <Button
              onClick={stopCamera}
              variant="outline"
              disabled={disabled}
              data-testid="button-cancel-camera"
            >
              <i className="fas fa-times mr-2"></i>
              Cancel
            </Button>
          </>
        )}

        {capturedImage && (
          <>
            <Button
              onClick={useCapturedImage}
              disabled={disabled}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              data-testid="button-use-image"
            >
              <i className="fas fa-check mr-2"></i>
              Use Image
            </Button>
            <Button
              onClick={retake}
              variant="outline"
              disabled={disabled}
              data-testid="button-retake"
            >
              <i className="fas fa-redo mr-2"></i>
              Retake
            </Button>
          </>
        )}
      </div>

      {/* Camera Tips */}
      {isStreaming && !capturedImage && (
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-2">
            <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
            Capture Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure good lighting for better image quality</li>
            <li>• Hold the device steady to avoid blur</li>
            <li>• Frame the subject within the corner guides</li>
            <li>• For medicine bottles, include the label clearly</li>
          </ul>
        </div>
      )}

      {/* Browser Support Warning */}
      {typeof navigator !== 'undefined' && !navigator.mediaDevices && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
            <div>
              <p className="text-sm font-medium text-yellow-800">Camera Not Supported</p>
              <p className="text-xs text-yellow-700">
                Your browser doesn't support camera access. Please use the file upload option instead.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
