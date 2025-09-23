"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageEditorDialog } from "@/components/image-editor-dialog";
import type { CarouselImage } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  get_all_carousel_images,
  upload_image_to_s3,
  add_carousel_image,
  update_carousel_image,
  delete_carousel_image,
  toggle_carousel_status
} from "../../../constants/authService";

export default function CarouselPage() {
  const { toast } = useToast();
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await get_all_carousel_images();
      setImages(res);
      setLoading(false);
    })();
  }, []);

  const handleToggleActive = async (id: string) => {
    try {
      const response = await toggle_carousel_status(id);

      if (response.data) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, is_active: !img.is_active } : img
          )
        );
        toast({
          title: "Status Updated",
          description: `Carousel image has been ${
            response.data.is_active ? "activated" : "deactivated"
          }.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: response.message || "Could not update status.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while toggling status.",
      });
    }
  };

  const handleSaveImage = async (id: string, newSrc: string) => {
    const blob = await (await fetch(newSrc)).blob();
    const uploadRes = await upload_image_to_s3(blob, `carousel-${Date.now()}.jpg`);
    const { message, imageKey, imageUrl } = uploadRes;
    console.log("Upload Response:", uploadRes);
    console.log(imageKey, imageUrl);

    if (images.find((img) => img.id === id)) {
      await update_carousel_image(id, { image_key : imageKey, image_url : imageUrl });
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, image_url: imageUrl, imageKey } : img))
      );
    } else {
      const newImage = await add_carousel_image({ image_key: imageKey, is_active: true});
      setImages((prev) => [newImage, ...prev]);
    }

    setEditingImage(null);  
  };

  const handleDeleteImage = async (id: string) => {
    await delete_carousel_image(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newImage: CarouselImage = {
              id: Date.now().toString(),
              image_url: URL.createObjectURL(file),
              image_key: file.name,
              is_active: true,
              is_deleted: false,
              created_by: "admin",
              created_date: new Date().toISOString(),
              modified_by: "admin",
              modified_date: new Date().toISOString(),
            };
            setEditingImage(newImage);
          }
        }}
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
            <PlusCircle /> <span>Add New Image</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-2 border rounded-md">
                <Skeleton className="h-[60px] w-[120px] rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))
          ) : images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="flex items-center gap-4 p-2 border rounded-md">
                <div className="relative">
                  <Image
                    src={image.image_url}
                    alt={image.image_key}
                    width={120}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <Badge variant={image.is_active ? "default" : "secondary"} className="absolute top-1 left-1">
                    {image.is_active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                    {image.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex-1">
                  <p className="font-medium truncate">{`Image ${image.id}`}</p>
                  <p className="text-xs text-muted-foreground truncate">{image.image_key}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-switch-${image.id}`}
                      checked={image.is_active}  
                      onCheckedChange={() => handleToggleActive(image.id)}
                    />
                    <Label htmlFor={`active-switch-${image.id}`} className="text-xs">
                      Active
                    </Label>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setEditingImage(image)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(image.id)}>
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
              <PlusCircle className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No images in the carousel yet. Click here to upload one.</p>
            </div>
          )}
        </CardContent>
      </Card>
      {editingImage && (
        <ImageEditorDialog image={editingImage} onSave={handleSaveImage} onClose={() => setEditingImage(null)} />
      )}
    </main>
  );
}