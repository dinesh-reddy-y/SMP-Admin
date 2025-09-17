import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const carouselImages = [
  { id: 1, src: "https://picsum.photos/seed/carousel1/800/400", alt: "Carousel Image 1", hint: "nature landscape" },
  { id: 2, src: "https://picsum.photos/seed/carousel2/800/400", alt: "Carousel Image 2", hint: "city architecture" },
  { id: 3, src: "https://picsum.photos/seed/carousel3/800/400", alt: "Carousel Image 3", hint: "abstract technology" },
];

export default function CarouselPage() {
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
            {carouselImages.map((image) => (
              <div key={image.id} className="flex items-center gap-4 p-2 border rounded-md">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={60}
                  className="rounded-md object-cover"
                  data-ai-hint={image.hint}
                />
                <div className="flex-1">
                  <p className="font-medium truncate">{`Image ${image.id}`}</p>
                  <p className="text-xs text-muted-foreground truncate">{image.alt}</p>
                </div>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
