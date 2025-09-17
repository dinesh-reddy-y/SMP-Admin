
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageEditorDialog } from "@/components/image-editor-dialog";
import type { CarouselImage } from "@/lib/types";

interface Ad extends CarouselImage {
    client: string;
}

const initialAds: Ad[] = [
  { id: 1, src: "https://picsum.photos/seed/ad1/600/400", alt: "Summer Sale Banner", hint: "summer sale", active: true, client: "FashionNova" },
  { id: 2, src: "https://picsum.photos/seed/ad2/600/400", alt: "New Gadget Launch", hint: "tech gadget", active: true, client: "TechCorp" },
  { id: 3, src: "https://picsum.photos/seed/ad3/600/400", alt: "Holiday Travel Deals", hint: "travel holiday", active: false, client: "GoTravel" },
];

export default function AdsPage() {
    const [ads, setAds] = useState<Ad[]>(initialAds);
    const [editingAd, setEditingAd] = useState<Ad | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveAd = (id: number, newSrc: string) => {
        const existingAd = ads.find(ad => ad.id === id);
        if (existingAd) {
            setAds(ads.map(ad => ad.id === id ? { ...ad, src: newSrc } : ad));
        } else {
            const newAd: Ad = {
                id: ads.length > 0 ? Math.max(...ads.map(i => i.id)) + 1 : 1,
                src: newSrc,
                alt: `New Ad ${ads.length + 1}`,
                hint: 'new custom ad',
                active: true,
                client: "New Client",
            };
            setAds(prevAds => [newAd, ...prevAds]);
        }
        setEditingAd(null);
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setEditingAd({
                        id: Date.now(),
                        src: e.target.result as string,
                        alt: file.name,
                        hint: 'new upload',
                        active: true,
                        client: "New Client"
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleEditorClose = () => {
        setEditingAd(null);
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
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Ads Management</h1>
                    <p className="text-muted-foreground">Create, monitor, and manage your ad campaigns.</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>
                    <PlusCircle />
                    <span>Create New Ad</span>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ads.map((ad) => (
                    <Card key={ad.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                        <CardHeader className="p-0">
                            <div className="relative">
                                <Image
                                    src={ad.src}
                                    alt={ad.alt}
                                    width={600}
                                    height={400}
                                    className="aspect-video w-full object-cover"
                                    data-ai-hint={ad.hint}
                                />
                                <Badge variant={ad.active ? 'default' : 'secondary'} className="absolute top-2 left-2">
                                    {ad.active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                    {ad.active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <h3 className="text-lg font-semibold">{ad.alt}</h3>
                            <p className="text-sm text-muted-foreground">{ad.client}</p>
                        </CardContent>
                        <CardFooter className="p-2 border-t bg-muted/50">
                            <div className="flex w-full justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setEditingAd(ad)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
                 {ads.length === 0 && (
                    <Card 
                        className="md:col-span-2 lg:col-span-3 border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center text-center p-8 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                            No ads created yet. Click here to upload one.
                        </p>
                    </Card>
                )}
            </div>

            {editingAd && (
                <ImageEditorDialog
                image={editingAd}
                onSave={(id, newSrc) => handleSaveAd(id, newSrc)}
                onClose={handleEditorClose}
                />
            )}
        </main>
    );
}
