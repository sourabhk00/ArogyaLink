import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  description?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export default function FileUpload({
  onFileSelect,
  accept = ".jpg,.jpeg,.png,.pdf",
  maxSize = 10 * 1024 * 1024, // 10MB default
  description = "Drop files here or click to upload",
  disabled = false,
  multiple = false,
}: FileUploadProps) {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
        variant: "destructive",
      });
      return false;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeTypeMatch = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return type === fileExtension;
      }
      return file.type.match(type.replace('*', '.*'));
    });

    if (!mimeTypeMatch) {
      toast({
        title: "Invalid File Type",
        description: `Please select a file with one of these extensions: ${accept}`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!validateFile(file)) return;

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4" data-testid="file-upload-component">
      {/* File Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${isDragOver ? 'border-primary bg-primary/5 file-upload-area drag-over' : 'border-border hover:border-primary/50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${selectedFile ? 'bg-muted/50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        data-testid="file-upload-drop-zone"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          multiple={multiple}
          className="hidden"
          data-testid="file-upload-input"
        />

        {selectedFile ? (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <i className="fas fa-file text-primary text-xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearFile} data-testid="button-clear-file">
                <i className="fas fa-times mr-2"></i>
                Remove
              </Button>
              <Button variant="outline" size="sm" onClick={handleClick} data-testid="button-replace-file">
                <i className="fas fa-exchange-alt mr-2"></i>
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <i className="fas fa-cloud-upload-alt text-primary text-xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                {isDragOver ? "Drop files here" : description}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports {accept.replace(/\./g, '').toUpperCase()} up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={disabled}
                data-testid="button-choose-files"
              >
                <i className="fas fa-folder-open mr-2"></i>
                Choose Files
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {selectedFile && (
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">Ready to upload</span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-full"></div>
            </div>
          </div>
          <i className="fas fa-check-circle text-accent text-lg"></i>
        </div>
      )}

      {/* File Type Help */}
      <div className="text-xs text-muted-foreground">
        <strong>Supported formats:</strong> {accept.split(',').map(type => type.trim().toUpperCase()).join(', ')}
      </div>
    </div>
  );
}
