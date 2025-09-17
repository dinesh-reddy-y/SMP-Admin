
"use client";

import { useState, useRef } from "react";
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
import { UploadCloud } from "lucide-react";
import { ImageEditorDialog } from "./image-editor-dialog";
import type { CarouselImage } from "@/lib/types";

interface FileUploadProps {
  onUploadComplete: (imageDataUrl: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<CarouselImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageToEdit({
            id: Date.now(),
            src: e.target.result as string,
            alt: file.name,
            hint: 'new upload',
            active: true
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorSave = (id: number, newSrc: string) => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
        onUploadComplete(newSrc);
        toast({
            title: "Upload successful",
            description: `${imageToEdit?.alt} has been uploaded and added to the carousel.`,
        });
        setImageToEdit(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setIsUploading(false);
    }, 1500);
  }
  
  const handleEditorClose = () => {
    setImageToEdit(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors">
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            Click to select an image
          </p>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={isUploading}
            ref={fileInputRef}
          />
        </div>
      </div>
      {imageToEdit && (
        <ImageEditorDialog
          image={imageToEdit}
          onSave={handleEditorSave}
          onClose={handleEditorClose}
        />
      )}
    </>
  );
}
