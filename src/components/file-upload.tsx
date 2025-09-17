"use client";

import { useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

export function FileUpload() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
        // In a real app, this would be the API call to your Node.js backend
        // await axios.post('/api/upload', formData, {
        //   headers: { 'Content-Type': 'multipart/form-data' },
        // });

        console.log("Uploading file:", file.name);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
            title: "Upload successful",
            description: `${file.name} has been uploaded.`,
        });
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    } catch (error) {
        console.error("File upload failed", error);
        toast({
            variant: "destructive",
            title: "Upload failed",
            description: "Could not upload the file. Please try again.",
        });
    } finally {
        setIsUploading(false);
    }
  };
  
  const clearFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Drag & drop a file here, or click to select a file
            </p>
            <Input
              id="file-upload"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isUploading}
              ref={fileInputRef}
            />
          </div>
          {file && (
            <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0"/>
                <span className="text-sm font-medium truncate">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={clearFile} disabled={isUploading}>
                <X className="h-4 w-4"/>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Upload File"}
        </Button>
      </CardFooter>
    </Card>
  );
}
