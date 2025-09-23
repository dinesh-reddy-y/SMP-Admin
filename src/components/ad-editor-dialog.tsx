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
import { UploadCloud } from 'lucide-react';

import type { Ad } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AdEditorDialogProps {
  ad: Partial<Ad>;
  onSave: (data: Partial<Ad>, file?: File) => void;
  onClose: () => void;
}

const adSchema = z.object({
  title: z.string().min(1, "Title is required."),
  client: z.string().min(1, "Client name is required."),
  description: z.string().optional(),
  redirect_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  image_url: z.string().min(1, "An image is required."),
  is_active: z.boolean(),
});

export function AdEditorDialog({ ad, onSave, onClose }: AdEditorDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(ad.image_url ?? null);
  const [imageFile, setImageFile] = useState<File | undefined>();

  const form = useForm<z.infer<typeof adSchema>>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      title: ad.title ?? '',
      client: ad.client ?? '',
      description: ad.description ?? '',
      redirect_url: ad.redirect_url ?? '',
      image_url: ad.image_url ?? '',
      is_active: ad.is_active ?? true,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('image_url', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof adSchema>) {
    onSave(
      {
        ...ad,
        ...values,
      },
      imageFile
    );
    toast({
        title: "Ad Saved",
        description: "The ad details have been successfully updated.",
    });
  }

  return (
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
                    name="title"
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
                    name="redirect_url"
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
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Ad image preview" fill className="rounded-md object-contain" />
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
                     <FormMessage>{form.formState.errors.image_url?.message}</FormMessage>
                     <FormField
                        control={form.control}
                        name="is_active"
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
  );
}