import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PromocodesPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Promocodes Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for managing promocodes in the client app.</p>
        </CardContent>
      </Card>
    </main>
  );
}
