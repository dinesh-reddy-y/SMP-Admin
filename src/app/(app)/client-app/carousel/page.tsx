
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, CheckCircle, XCircle, PlusCircle, UploadCloud } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageEditorDialog } from "@/components/image-editor-dialog";
import type { CarouselImage } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const initialCarouselImages: CarouselImage[] = [
  { id: 1, src: "https://picsum.photos/seed/carousel1/800/400", alt: "Carousel Image 1", hint: "nature landscape", active: true },
  { id: 2, src: "https://picsum.photos/seed/carousel2/800/400", alt: "Carousel Image 2", hint: "city architecture", active: true },
  { id: 3, src: "https://picsum.photos/seed/carousel3/800/400", alt: "Carousel Image 3", hint: "abstract technology", active: false },
];

export default function CarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>(initialCarouselImages);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleActive = (id: number) => {
    setImages(images.map(img => img.id === id ? { ...img, active: !img.active } : img));
  };

  const handleImageSave = (id: number, newSrc: string) => {
    const existingImage = images.find(img => img.id === id);
    if (existingImage) {
        setImages(images.map(img => img.id === id ? { ...img, src: newSrc } : img));
    } else {
        const newImage: CarouselImage = {
            id: images.length > 0 ? Math.max(...images.map(i => i.id)) + 1 : 1,
            src: newSrc,
            alt: `Carousel Image ${images.length + 1}`,
            hint: 'new custom image',
            active: true,
        };
        setImages(prevImages => [newImage, ...prevImages]);
    }
    setEditingImage(null);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEditingImage({
            id: Date.now(), // Temporary ID for new image
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

  const handleEditorClose = () => {
    setEditingImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Carousel Management</h1>
        <p className="text-muted-foreground">Manage the images displayed in the client app's main carousel.</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Current Carousel Images</CardTitle>
                <CardDescription>View, edit, and manage your carousel images.</CardDescription>
            </div>
            <Button onClick={() => fileInputRef.current?.click()}>
                <PlusCircle />
                <span>Add New Image</span>
            </Button>
        </CardHeader>
        <CardContent className="space-y-4">
        {images.length > 0 ? (
            images.map((image) => (
            <div key={image.id} className="flex items-center gap-4 p-2 border rounded-md">
                <div className="relative">
                    <Image
                    src={image.src}
                    alt={image.alt}
                    width={120}
                    height={60}
                    className="rounded-md object-cover"
                    data-ai-hint={image.hint}
                    />
                    <Badge variant={image.active ? 'default' : 'secondary'} className="absolute top-1 left-1">
                        {image.active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {image.active ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
                <div className="flex-1">
                <p className="font-medium truncate">{`Image ${image.id}`}</p>
                <p className="text-xs text-muted-foreground truncate">{image.alt}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                        <Switch 
                            id={`active-switch-${image.id}`} 
                            checked={image.active}
                            onCheckedChange={() => handleToggleActive(image.id)}
                        />
                        <Label htmlFor={`active-switch-${image.id}`} className="text-xs">Active</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setEditingImage(image)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            ))
        ) : (
            <div 
                className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                    No images in the carousel yet. Click here to upload one.
                </p>
            </div>
        )}
        </CardContent>
      </Card>
      
      {editingImage && (
        <ImageEditorDialog
          image={editingImage}
          onSave={handleImageSave}
          onClose={handleEditorClose}
        />
      )}
    </main>
  );
}
