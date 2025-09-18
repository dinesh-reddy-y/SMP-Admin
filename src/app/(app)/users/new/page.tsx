
"use client";

import { useState, useEffect } from "react";
import { UserDetailCard } from "@/components/user-detail-card";
import type { User } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const newUsersData: User[] = [
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

const UserCardSkeleton = () => (
    <Card className="flex flex-col text-center">
        <CardContent className="flex-grow p-6 space-y-4">
            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <Skeleton className="h-6 w-16 mx-auto rounded-full" />
        </CardContent>
        <div className="p-3 pt-0 border-t">
            <Skeleton className="h-9 w-full" />
        </div>
    </Card>
);

export default function NewUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUsers(newUsersData);
            setLoading(false);
        };
        fetchUsers();
    }, []);

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">New Users</h1>
        <p className="text-muted-foreground">A list of recently registered users.</p>
      </div>
      <Separator />
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
            Array.from({ length: 2 }).map((_, index) => <UserCardSkeleton key={index} />)
        ) : (
            users.map(user => (
                <UserDetailCard key={user.id} user={user} />
            ))
        )}
      </div>
    </main>
  );
}
