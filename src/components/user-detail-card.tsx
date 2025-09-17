"use client";

import type { User } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DollarSign, User as UserIcon, Truck, CalendarIcon, Mail } from "lucide-react";
import { Separator } from "./ui/separator";

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

const DetailRow = ({ icon, label, value, valueComponent }: { icon: React.ReactNode, label: string, value?: string | number | null, valueComponent?: React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        {valueComponent || <span className="font-medium text-sm">{value ?? 'N/A'}</span>}
    </div>
);

export function UserDetailCard({ user }: UserDetailCardProps) {
  const userInitial = user.name.charAt(0).toUpperCase();

  return (
    <Card className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="flex-grow p-6 space-y-4">
            <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} data-ai-hint="user avatar" />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
      </CardContent>
      <CardFooter className="p-3 pt-0 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full">More Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                    <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} data-ai-hint="user avatar" />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div>
                    <DialogTitle className="text-xl">{user.name}</DialogTitle>
                    <DialogDescription>
                        Detailed information including ratings and earnings.
                    </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <DetailRow icon={<Mail className="h-4 w-4 text-muted-foreground" />} label="Email" value={user.email} />
                <DetailRow icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />} label="Joined Date" value={format(new Date(user.createdAt), "PPP")} />
                <DetailRow 
                    icon={<UserIcon className="h-4 w-4 text-muted-foreground" />} 
                    label="Role" 
                    valueComponent={<Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>} 
                />
                <Separator />
                <DetailRow icon={<UserIcon className="h-4 w-4 text-muted-foreground" />} label="Rating as User" value={user.ratingAsUser ? `${user.ratingAsUser} / 5.0` : null} />
                <DetailRow icon={<Truck className="h-4 w-4 text-muted-foreground" />} label="Rating as Transporter" value={user.ratingAsTransporter ? `${user.ratingAsTransporter} / 5.0` : null} />
                <DetailRow icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} label="Total Earnings" value={user.earnings ? `$${user.earnings.toFixed(2)}` : '$0.00'} />
            </div>
            <DialogFooter>
                <Button type="button" variant="secondary">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
