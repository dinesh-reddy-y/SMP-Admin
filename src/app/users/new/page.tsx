import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NewUsersPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the page for new users.</p>
        </CardContent>
      </Card>
    </main>
  );
}
