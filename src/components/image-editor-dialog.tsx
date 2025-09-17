"use client";

import { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import type { CarouselImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ImageEditorDialogProps {
  image: CarouselImage;
  onSave: (id: number, newSrc: string) => void;
  onClose: () => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function ImageEditorDialog({ image, onSave, onClose }: ImageEditorDialogProps) {
  const { toast } = useToast();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const handleSaveCrop = () => {
    const imageElement = imgRef.current;
    if (!imageElement || !completedCrop) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not process image. Please try again.",
        });
        return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imageElement.naturalWidth / imageElement.width;
    const scaleY = imageElement.naturalHeight / imageElement.height;
    
    canvas.width = Math.floor(completedCrop.width * scaleX);
    canvas.height = Math.floor(completedCrop.height * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not create canvas context for cropping.",
        });
        return;
    }

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(
      imageElement,
      cropX,
      cropY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg');
    onSave(image.id, dataUrl);
    toast({
        title: "Image updated",
        description: "Your image has been successfully cropped and saved.",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Crop, rotate, and scale your image. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex justify-center bg-muted/40 p-4 rounded-md">
                <ReactCrop
                    crop={crop}
                    onChange={c => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={image.src}
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                        crossOrigin="anonymous"
                    />
                </ReactCrop>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label htmlFor="scale-slider">Scale</Label>
                    <Slider id="scale-slider" defaultValue={[1]} min={0.5} max={2} step={0.1} onValueChange={(value) => setScale(value[0])} />
                </div>
                <div>
                    <Label htmlFor="rotate-slider">Rotate</Label>
                    <Slider id="rotate-slider" defaultValue={[0]} min={-180} max={180} step={1} onValueChange={(value) => setRotate(value[0])} />
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSaveCrop}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
