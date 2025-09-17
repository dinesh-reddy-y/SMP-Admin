import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CarouselPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carousel Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for managing the client app carousel.</p>
        </CardContent>
      </Card>
    </main>
  );
}
