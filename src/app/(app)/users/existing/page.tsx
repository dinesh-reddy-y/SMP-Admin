
"use client";

import { useState, useEffect } from "react";
import { UserDetailCard } from "@/components/user-detail-card";
import type { User } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const existingUsersData: User[] = [
  { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', mbl_num: '1234567890', is_verified: true, roles_id: '1', total_earnings: '1500.00', is_active: true, is_blocked: false, created_date: new Date('2023-01-15').toISOString(), ratingAsUser: 4.8, ratingAsTransporter: 4.9 },
  { id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', mbl_num: '1234567891', is_verified: true, roles_id: '2', total_earnings: '0.00', is_active: true, is_blocked: false, created_date: new Date('2023-02-20').toISOString(), ratingAsUser: 4.5, ratingAsTransporter: null },
  { id: '3', first_name: 'Sam', last_name: 'Wilson', email: 'sam@example.com', mbl_num: '1234567892', is_verified: true, roles_id: '2', total_earnings: '3200.00', is_active: true, is_blocked: false, created_date: new Date('2023-03-10').toISOString(), ratingAsUser: 4.9, ratingAsTransporter: 5.0 },
  { id: '4', first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com', mbl_num: '1234567893', is_verified: false, roles_id: '3', total_earnings: '0.00', is_active: false, is_blocked: false, created_date: new Date('2023-04-05').toISOString(), ratingAsUser: null, ratingAsTransporter: null },
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


export default function ExistingUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUsers(existingUsersData);
            setLoading(false);
        };
        fetchUsers();
    }, []);

  return (
    <main className="flex-1 p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Existing Users</h1>
        <p className="text-muted-foreground">An overview of all existing users in the system.</p>
      </div>
      <Separator />
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => <UserCardSkeleton key={index} />)
        ) : (
            users.map(user => (
                <UserDetailCard key={user.id} user={user} />
            ))
        )}
      </div>
    </main>
  );
}
