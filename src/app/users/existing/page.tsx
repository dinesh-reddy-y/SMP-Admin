import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ExistingUsersPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Existing Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for existing users.</p>
        </CardContent>
      </Card>
    </main>
  );
}
