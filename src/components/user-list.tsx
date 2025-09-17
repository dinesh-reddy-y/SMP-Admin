"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/lib/types";
import { format } from 'date-fns';

// Mock data as there's no backend
const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', createdAt: new Date('2023-01-15').toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', createdAt: new Date('2023-02-20').toISOString() },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User', createdAt: new Date('2023-03-10').toISOString() },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Guest', createdAt: new Date('2023-04-05').toISOString() },
];

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, this would be the API call
        // const response = await axios.get("/api/users");
        // setUsers(response.data);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setUsers(mockUsers);
        
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'default';
      case 'User': return 'secondary';
      case 'Guest': return 'outline';
      default: return 'secondary';
    }
  }

  if (error) {
    return <Card><CardHeader><CardTitle>Error</CardTitle></CardHeader><CardContent><p className="text-destructive">{error}</p></CardContent></Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    </TableRow>
                ))
                ) : (
                users.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge></TableCell>
                    <TableCell>{format(new Date(user.createdAt), 'PPP')}</TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
