import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileImage, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: FileList) => void;
  acceptedFiles?: string;
  maxFiles?: number;
  uploading?: boolean;
  progress?: number;
}

const FileUpload = ({ 
  onFilesSelected, 
  acceptedFiles = "image/*,.json", 
  maxFiles = 2,
  uploading = false,
  progress = 0
}: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    const fileList = new DataTransfer();
    [...uploadedFiles, ...acceptedFiles].forEach(file => {
      fileList.items.add(file);
    });
    onFilesSelected(fileList.files);
  }, [uploadedFiles, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/json': ['.json']
    },
    maxFiles,
    disabled: uploading
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    const fileList = new DataTransfer();
    newFiles.forEach(file => {
      fileList.items.add(file);
    });
    onFilesSelected(fileList.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="h-8 w-8 text-primary" />;
    }
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <Card className={cn(
        "border-2 border-dashed transition-colors duration-200",
        isDragActive ? "border-primary bg-primary-light/10" : "border-border",
        uploading && "opacity-50"
      )}>
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className="text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className={cn(
              "mx-auto h-12 w-12 mb-4 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )} />
            <h3 className="text-lg font-medium mb-2">
              {isDragActive ? "Drop files here" : "Upload Eye Images"}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your eye images here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPEG, PNG images and optional JSON annotation files
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              disabled={uploading}
            >
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Selected Files:</h4>
          {uploadedFiles.map((file, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Image Preview */}
              {file.type.startsWith('image/') && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;