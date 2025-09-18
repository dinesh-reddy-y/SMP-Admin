
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdEditorDialog } from "@/components/ad-editor-dialog";
import type { Ad } from "@/lib/types";

const initialAds: Ad[] = [
  { id: 1, src: "https://picsum.photos/seed/ad1/600/400", alt: "Summer Sale Banner", hint: "summer sale", active: true, client: "FashionNova", description: "Get 50% off on all summer collections.", link: "https://example.com/sale" },
  { id: 2, src: "https://picsum.photos/seed/ad2/600/400", alt: "New Gadget Launch", hint: "tech gadget", active: true, client: "TechCorp", description: "The future is here. Pre-order now.", link: "https://example.com/gadget" },
  { id: 3, src: "https://picsum.photos/seed/ad3/600/400", alt: "Holiday Travel Deals", hint: "travel holiday", active: false, client: "GoTravel", description: "Explore the world with our exclusive deals.", link: "https://example.com/travel" },
];

export default function AdsPage() {
    const [ads, setAds] = useState<Ad[]>(initialAds);
    const [editingAd, setEditingAd] = useState<Partial<Ad> | null>(null);

    const handleSaveAd = (adData: Ad) => {
        const existingAdIndex = ads.findIndex(ad => ad.id === adData.id);

        if (existingAdIndex !== -1) {
            setAds(ads.map((ad, index) => index === existingAdIndex ? adData : ad));
        } else {
            const newAd: Ad = {
                ...adData,
                id: ads.length > 0 ? Math.max(...ads.map(i => i.id)) + 1 : 1,
            };
            setAds(prevAds => [newAd, ...prevAds]);
        }
        setEditingAd(null);
    };

    const handleCreateNew = () => {
        setEditingAd({});
    };

    return (
        <main className="flex-1 p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Ads Management</h1>
                    <p className="text-muted-foreground">Create, monitor, and manage your ad campaigns.</p>
                </div>
                <Button onClick={handleCreateNew}>
                    <PlusCircle />
                    <span>Create New Ad</span>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ads.map((ad) => (
                    <Card key={ad.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                        <CardHeader className="p-0">
                            <div className="relative">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={ad.src}
                                        alt={ad.alt}
                                        width={600}
                                        height={400}
                                        className="aspect-video w-full object-cover"
                                        data-ai-hint={ad.hint}
                                    />
                                </a>
                                <Badge variant={ad.active ? 'default' : 'secondary'} className="absolute top-2 left-2">
                                    {ad.active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                    {ad.active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <h3 className="text-lg font-semibold">{ad.alt}</h3>
                            <p className="text-sm font-semibold text-primary">{ad.client}</p>
                            <p className="text-sm text-muted-foreground mt-2">{ad.description}</p>
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
                        onClick={handleCreateNew}
                    >
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                            No ads created yet. Click here to create one.
                        </p>
                    </Card>
                )}
            </div>

            {editingAd && (
                <AdEditorDialog
                    ad={editingAd}
                    onSave={handleSaveAd}
                    onClose={() => setEditingAd(null)}
                />
            )}
        </main>
    );
}
