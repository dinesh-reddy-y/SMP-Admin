"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
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

  const handleToggleActive = (id: number) => {
    setImages(images.map(img => img.id === id ? { ...img, active: !img.active } : img));
  };

  const handleImageSave = (id: number, newSrc: string) => {
    setImages(images.map(img => img.id === id ? { ...img, src: newSrc } : img));
    setEditingImage(null);
  };

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Carousel Management</h1>
        <p className="text-muted-foreground">Manage the images displayed in the client app's main carousel.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
            <CardDescription>Add a new image to the carousel rotation.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Carousel Images</CardTitle>
            <CardDescription>View and manage existing carousel images.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {images.map((image) => (
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
            ))}
          </CardContent>
        </Card>
      </div>
      {editingImage && (
        <ImageEditorDialog
          image={editingImage}
          onSave={handleImageSave}
          onClose={() => setEditingImage(null)}
        />
      )}
    </main>
  );
}
