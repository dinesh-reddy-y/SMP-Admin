
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ImageEditorDialog } from './image-editor-dialog';
import { UploadCloud, Edit } from 'lucide-react';

import type { Ad, CarouselImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AdEditorDialogProps {
  ad: Partial<Ad>;
  onSave: (data: Ad) => void;
  onClose: () => void;
}

const adSchema = z.object({
  alt: z.string().min(1, "Title is required."),
  client: z.string().min(1, "Client name is required."),
  description: z.string().optional(),
  link: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  src: z.string().min(1, "An image is required."),
  active: z.boolean(),
});

export function AdEditorDialog({ ad, onSave, onClose }: AdEditorDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageToEdit, setImageToEdit] = useState<CarouselImage | null>(null);

  const form = useForm<z.infer<typeof adSchema>>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      alt: ad.alt ?? '',
      client: ad.client ?? '',
      description: ad.description ?? '',
      link: ad.link ?? '',
      src: ad.src ?? '',
      active: ad.active ?? true,
    },
  });

  const currentImageSrc = form.watch('src');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newImage: CarouselImage = {
            id: ad.id ?? Date.now(),
            src: e.target.result as string,
            alt: file.name,
            hint: 'ad image',
            active: true,
          };
          setImageToEdit(newImage);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageEditorSave = (id: number, newSrc: string) => {
    form.setValue('src', newSrc, { shouldValidate: true });
    if (!form.getValues('alt')) {
      form.setValue('alt', imageToEdit?.alt ?? 'New Ad');
    }
    setImageToEdit(null);
  };
  
  const handleImageEditorClose = () => {
    setImageToEdit(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  function onSubmit(values: z.infer<typeof adSchema>) {
    onSave({
      ...values,
      id: ad.id ?? 0,
      hint: 'custom ad',
    });
    toast({
        title: "Ad Saved",
        description: "The ad details have been successfully updated.",
    });
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{ad.id ? 'Edit Ad' : 'Create New Ad'}</DialogTitle>
            <DialogDescription>
              Fill in the details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Ad Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Summer Sale" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. FashionNova" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Short description of the ad..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Redirect Link</FormLabel>
                        <FormControl>
                            <Input type="url" placeholder="https://example.com/product" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="space-y-4">
                    <FormLabel>Image</FormLabel>
                    <div 
                        className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer aspect-video"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {currentImageSrc ? (
                            <>
                                <Image src={currentImageSrc} alt="Ad image preview" layout="fill" objectFit="contain" className="rounded-md" />
                                <Button type="button" variant="outline" size="icon" className="absolute top-2 right-2 z-10 bg-background/70 hover:bg-background">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-sm text-muted-foreground">Click to upload an image</p>
                            </>
                        )}
                        <Input
                            ref={fileInputRef}
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                     <FormMessage>{form.formState.errors.src?.message}</FormMessage>
                     <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Active Status</FormLabel>
                                <DialogDescription>
                                    Inactive ads will not be displayed.
                                </DialogDescription>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {imageToEdit && (
          <ImageEditorDialog
            image={imageToEdit}
            onSave={handleImageEditorSave}
            onClose={handleImageEditorClose}
          />
      )}
    </>
  );
}
