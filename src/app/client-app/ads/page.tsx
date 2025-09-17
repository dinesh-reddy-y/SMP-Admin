import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ads Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for managing ads in the client app.</p>
        </CardContent>
      </Card>
    </main>
  );
}
