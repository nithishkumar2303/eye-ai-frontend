// src/pages/upload.tsx
import React, { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";

// ✅ API URL from environment variable or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://eye-ai-backend-dybr.onrender.com";

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (files: FileList) => {
    setSelectedFiles(files);
    setPrediction(null); // Reset previous prediction
  };

  const handleAnalyze = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFiles[0]);

    setUploading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Error during prediction:", err);
      alert("Something went wrong. Check the backend.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-10">
      <h2 className="text-2xl font-semibold text-center">Meibomian Gland Analyzer</h2>

      <FileUpload
        onFilesSelected={handleFileSelect}
        uploading={uploading}
        maxFiles={1}
      />

      <div className="text-center">
        <Button onClick={handleAnalyze} disabled={uploading}>
          {uploading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {prediction !== null && (
        <div className="text-center mt-6 text-xl font-semibold text-primary">
          🔍 Prediction: Grade {prediction}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
