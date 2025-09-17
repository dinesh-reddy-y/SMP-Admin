import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the admin page. Admin controls will be available here.</p>
        </CardContent>
      </Card>
    </main>
  );
}
