
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
  { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', mbl_num: '1234567890', is_verified: true, roles_id: '1', total_earnings: '1500.00', is_active: true, is_blocked: false, created_date: new Date('2023-01-15').toISOString() },
  { id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', mbl_num: '1234567891', is_verified: true, roles_id: '2', total_earnings: '0.00', is_active: true, is_blocked: false, created_date: new Date('2023-02-20').toISOString() },
  { id: '3', first_name: 'Sam', last_name: 'Wilson', email: 'sam@example.com', mbl_num: '1234567892', is_verified: true, roles_id: '2', total_earnings: '3200.00', is_active: true, is_blocked: false, created_date: new Date('2023-03-10').toISOString() },
  { id: '4', first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com', mbl_num: '1234567893', is_verified: false, roles_id: '3', total_earnings: '0.00', is_active: false, is_blocked: false, created_date: new Date('2023-04-05').toISOString() },
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

  const getRoleFromId = (roleId: string) => {
    switch (roleId) {
        case '1': return 'Admin';
        case '2': return 'User';
        case '3': return 'Guest';
        default: return 'User';
    }
  };

  const getRoleBadgeVariant = (roleId: string) => {
    switch (roleId) {
      case '1': return 'default';
      case '2': return 'secondary';
      case '3': return 'outline';
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
                    <TableCell className="font-medium">{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant={getRoleBadgeVariant(user.roles_id)}>{getRoleFromId(user.roles_id)}</Badge></TableCell>
                    <TableCell>{format(new Date(user.created_date), 'PPP')}</TableCell>
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
