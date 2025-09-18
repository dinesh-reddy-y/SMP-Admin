
"use client";

import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DollarSign, User as UserIcon, Truck, CalendarIcon, Mail, ShieldBan, CheckCircle, XCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


interface UserDetailCardProps {
  user: User;
}

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

export function UserDetailCard({ user: initialUser }: UserDetailCardProps) {
  const [user, setUser] = useState(initialUser);
  const { toast } = useToast();
  const fullName = `${user.first_name} ${user.last_name}`;
  const userInitial = user.first_name.charAt(0).toUpperCase();
  const userRole = getRoleFromId(user.roles_id);
  const earnings = parseFloat(user.total_earnings);

  const handleStatusChange = (action: 'toggleActive' | 'toggleBlock') => {
    let updatedUser: User;
    let toastMessage = "";
    if (action === 'toggleActive') {
        updatedUser = { ...user, is_active: !user.is_active };
        toastMessage = `User has been ${updatedUser.is_active ? 'activated' : 'deactivated'}.`;
    } else {
        updatedUser = { ...user, is_blocked: !user.is_blocked };
        toastMessage = `User has been ${updatedUser.is_blocked ? 'blocked' : 'unblocked'}.`;
    }
    // Simulate API call
    setUser(updatedUser);
    toast({
      title: "Success",
      description: toastMessage,
    });
  };

  return (
    <Card className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="flex-grow p-6 space-y-4">
            <div className="relative inline-block">
                <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} data-ai-hint="user avatar" />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 flex items-center justify-center -mr-2 mb-1 gap-1">
                   {user.is_blocked && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                            <ShieldBan className="h-4 w-4" />
                        </span>
                    )}
                     <span className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        user.is_active ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                     )}>
                        {user.is_active ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold">{fullName}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant={getRoleBadgeVariant(user.roles_id)}>{userRole}</Badge>
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
                    <DialogTitle className="text-xl">{fullName}</DialogTitle>
                    <DialogDescription>
                        Detailed information including ratings and earnings.
                    </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <DetailRow icon={<Mail className="h-4 w-4 text-muted-foreground" />} label="Email" value={user.email} />
                <DetailRow icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />} label="Joined Date" value={format(new Date(user.created_date), "PPP")} />
                <DetailRow 
                    icon={<UserIcon className="h-4 w-4 text-muted-foreground" />} 
                    label="Role" 
                    valueComponent={<Badge variant={getRoleBadgeVariant(user.roles_id)}>{userRole}</Badge>} 
                />
                <Separator />
                <DetailRow icon={<UserIcon className="h-4 w-4 text-muted-foreground" />} label="Rating as User" value={user.ratingAsUser ? `${user.ratingAsUser} / 5.0` : null} />
                <DetailRow icon={<Truck className="h-4 w-4 text-muted-foreground" />} label="Rating as Transporter" value={user.ratingAsTransporter ? `${user.ratingAsTransporter} / 5.0` : null} />
                <DetailRow icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} label="Total Earnings" value={earnings ? `$${earnings.toFixed(2)}` : '$0.00'} />
            </div>
            <DialogFooter className="gap-2 sm:justify-between">
                <div>
                    {user.is_blocked ? (
                        <Button variant="outline" onClick={() => handleStatusChange('toggleBlock')}>Unblock User</Button>
                    ) : (
                       <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Block User</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to block this user?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Blocking this user will prevent them from accessing the application.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleStatusChange('toggleBlock')}>Confirm Block</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <div className="flex gap-2">
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={user.is_active ? 'secondary' : 'default'}>
                                {user.is_active ? 'Make Inactive' : 'Make Active'}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You are about to change the active status of this user.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleStatusChange('toggleActive')}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <DialogTrigger asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogTrigger>
                </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

    