"use client";

import type { User } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, DollarSign, User as UserIcon, Truck, Building } from "lucide-react";

interface UserDetailCardProps {
  user: User;
}

const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'default';
      case 'User': return 'secondary';
      case 'Guest': return 'outline';
      default: return 'secondary';
    }
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number | null }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <span className="font-medium text-sm">{value ?? 'N/A'}</span>
    </div>
);

export function UserDetailCard({ user }: UserDetailCardProps) {
  const userInitial = user.name.charAt(0).toUpperCase();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} data-ai-hint="user avatar" />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div>
            <span className="text-sm font-medium">Role: </span>
            <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Joined on {format(new Date(user.createdAt), "PPP")}
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">More Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{user.name}'s Details</DialogTitle>
              <DialogDescription>
                Detailed information including ratings and earnings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <DetailRow icon={<UserIcon className="h-4 w-4" />} label="Rating as User" value={user.ratingAsUser ? `${user.ratingAsUser} / 5.0` : null} />
                <DetailRow icon={<Truck className="h-4 w-4" />} label="Rating as Transporter" value={user.ratingAsTransporter ? `${user.ratingAsTransporter} / 5.0` : null} />
                <DetailRow icon={<DollarSign className="h-4 w-4" />} label="Total Earnings" value={user.earnings ? `$${user.earnings.toFixed(2)}` : '$0.00'} />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
