import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddAdminPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for adding an admin.</p>
        </CardContent>
      </Card>
    </main>
  );
}
