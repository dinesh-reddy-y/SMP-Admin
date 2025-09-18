import { UserDetailCard } from "@/components/user-detail-card";
import type { User } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const existingUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', createdAt: new Date('2023-01-15').toISOString(), ratingAsUser: 4.8, ratingAsTransporter: 4.9, earnings: 1500 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', createdAt: new Date('2023-02-20').toISOString(), ratingAsUser: 4.5, ratingAsTransporter: null, earnings: 0 },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User', createdAt: new Date('2023-03-10').toISOString(), ratingAsUser: 4.9, ratingAsTransporter: 5.0, earnings: 3200 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Guest', createdAt: new Date('2023-04-05').toISOString(), ratingAsUser: null, ratingAsTransporter: null, earnings: 0 },
];

export default function ExistingUsersPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Existing Users</h1>
        <p className="text-muted-foreground">An overview of all existing users in the system.</p>
      </div>
      <Separator />
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {existingUsers.map(user => (
          <UserDetailCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
