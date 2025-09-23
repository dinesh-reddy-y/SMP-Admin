"use client";

import { useState, useRef } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import type { CarouselImage } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ImageEditorDialogProps {
  image: CarouselImage;
  onSave: (id: string, newSrc: string) => void;
  onClose: () => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const fullImageCrop: Crop = {
  unit: "%",
  width: 100,
  height: 100,
  x: 0,
  y: 0,
};

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
      const c = centerAspectCrop(width, height, aspect);
      setCrop(c);
      setCompletedCrop(c);
    } else {
      setCrop(fullImageCrop);
      setCompletedCrop(fullImageCrop);
    }
  }

  const handleSaveCrop = () => {
    const imageElement = imgRef.current;
    if (!imageElement || !completedCrop || typeof completedCrop.width !== 'number' || typeof completedCrop.height !== 'number' || typeof completedCrop.x !== 'number' || typeof completedCrop.y !== 'number') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a crop before saving.",
      });
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imageElement.naturalWidth / imageElement.width;
    const scaleY = imageElement.naturalHeight / imageElement.height;

    const pixelRatio = window.devicePixelRatio || 1;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    canvas.width = cropWidth * pixelRatio;
    canvas.height = cropHeight * pixelRatio;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    // move to center to rotate/scale
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      imageElement,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    onSave(image.id, dataUrl);

    toast({
      title: "Image updated",
      description: "Your image has been successfully cropped and saved.",
    });
  };

  const handleAspectChange = (value: string) => {
    const newAspect = value === "free" ? undefined : parseFloat(value);
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      if (newAspect) {
        const c = centerAspectCrop(width, height, newAspect);
        setCrop(c);
        setCompletedCrop(c);
      } else {
        setCrop(fullImageCrop);
        setCompletedCrop(fullImageCrop);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Crop, rotate, and scale your image. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div className="md:col-span-2 flex justify-center bg-muted/40 p-4 rounded-md h-96">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              keepSelection
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={image.image_url}
                className="object-contain h-full"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>
          <div className="space-y-6">
            <div>
              <Label>Aspect Ratio</Label>
              <RadioGroup
                defaultValue={aspect ? (16 / 9).toString() : "free"}
                onValueChange={handleAspectChange}
                className="grid grid-cols-2 gap-2 mt-2"
              >
                <div>
                  <RadioGroupItem value={(16 / 9).toString()} id="r1" className="peer sr-only" />
                  <Label
                    htmlFor="r1"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary text-center text-sm"
                  >
                    16:9
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value={(4 / 3).toString()} id="r2" className="peer sr-only" />
                  <Label
                    htmlFor="r2"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary text-center text-sm"
                  >
                    4:3
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="1" id="r3" className="peer sr-only" />
                  <Label
                    htmlFor="r3"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary text-center text-sm"
                  >
                    1:1
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="free" id="r4" className="peer sr-only" />
                  <Label
                    htmlFor="r4"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary text-center text-sm"
                  >
                    Free
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="scale-slider">Scale</Label>
              <Slider
                id="scale-slider"
                defaultValue={[1]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(value) => setScale(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="rotate-slider">Rotate</Label>
              <Slider
                id="rotate-slider"
                defaultValue={[0]}
                min={-180}
                max={180}
                step={1}
                onValueChange={(value) => setRotate(value[0])}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSaveCrop}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
