
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdEditorDialog } from "@/components/ad-editor-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAds, saveAd, deleteAd, upload_image_to_s3 } from "@/app/constants/authService";
import type { Ad } from "@/lib/types";

const AdSkeleton = () => (
    <Card className="flex flex-col overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-4 flex-grow space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </CardContent>
        <CardFooter className="p-2 border-t bg-muted/50">
            <div className="flex w-full justify-end gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
            </div>
        </CardFooter>
    </Card>
);

export default function AdsPage() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [editingAd, setEditingAd] = useState<Partial<Ad> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAds = async () => {
            try {
                setLoading(true);
                const data = await fetchAds();
                setAds(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadAds();
    }, []);

    const handleSaveAd = async (adData: Partial<Ad>, file?: File) => {
        try {
            let adToSave = { ...adData };

            if (file) {
                const fileName = file.name;
                const uploadRes = await upload_image_to_s3(file, fileName);
                adToSave.image_key = uploadRes.imageKey;
                adToSave.image_url = uploadRes.imageUrl;
            }

            await saveAd(adToSave);

            // Refresh ads after save
            const data = await fetchAds();
            setAds(data);
            setEditingAd(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteAd(id);
            setAds(ads.filter((ad) => ad.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreateNew = () => setEditingAd({});

    return (
        <main className="flex-1 p-4 md:p-6 space-y-6">
            {/* Header */}
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

            {/* Ads grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => <AdSkeleton key={index} />)
                ) : ads.length > 0 ? (
                    ads.map((ad) => (
                        <Card key={ad.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                            <CardHeader className="p-0">
                                <div className="relative">
                                    <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={ad.image_url}
                                            alt={ad.title}
                                            width={600}
                                            height={400}
                                            className="aspect-video w-full object-cover"
                                            data-ai-hint={ad.title}
                                        />
                                    </a>
                                    <Badge variant={ad.is_active ? "default" : "secondary"} className="absolute top-2 left-2">
                                        {ad.is_active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                        {ad.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <h3 className="text-lg font-semibold">{ad.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{ad.description}</p>
                            </CardContent>
                            <CardFooter className="p-2 border-t bg-muted/50">
                                <div className="flex w-full justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingAd(ad)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(ad.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
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
                <AdEditorDialog ad={editingAd} onSave={handleSaveAd} onClose={() => setEditingAd(null)} />
            )}
        </main>
    );
}
