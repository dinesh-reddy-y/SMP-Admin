import { UserDetailCard } from "@/components/user-detail-card";
import type { User } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const newUsers: User[] = [
  {
    id: 5,
    name: 'Emily Clark',
    email: 'emily@example.com',
    role: 'User',
    createdAt: new Date('2023-05-01').toISOString(),
    ratingAsUser: 4.9,
    ratingAsTransporter: null,
    earnings: 0,
  },
  {
    id: 6,
    name: 'Michael Bui',
    email: 'michael@example.com',
    role: 'User',
    createdAt: new Date('2023-05-03').toISOString(),
    ratingAsUser: 5.0,
    ratingAsTransporter: 4.7,
    earnings: 250,
  }
];

export default function NewUsersPage() {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">A list of recently registered users.</p>
          <Separator />
          <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
            {newUsers.map(user => (
              <UserDetailCard key={user.id} user={user} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
