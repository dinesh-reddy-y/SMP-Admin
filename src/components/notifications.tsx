"use client";

import { useState, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { io, Socket } from "socket.io-client";
import type { Notification } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    });

    socket.on("new_notification", (data: Omit<Notification, 'timestamp'>) => {
      const newNotification: Notification = {
        ...data,
        timestamp: new Date()
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
      setHasUnread(true);
    });
    
    // Simulating notifications for demonstration since there's no backend
    const interval = setInterval(() => {
        const mockNotification: Notification = {
            id: new Date().getTime().toString(),
            message: `New package #${Math.floor(Math.random() * 1000)} has been shipped.`,
            timestamp: new Date()
        };
        setNotifications((prev) => [mockNotification, ...prev].slice(0, 10));
        setHasUnread(true);
    }, 10000);


    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setHasUnread(false);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          {hasUnread ? (
            <BellRing className="h-5 w-5 text-accent animate-pulse" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {hasUnread && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 font-semibold border-b">Notifications</div>
        <div className="p-2 max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className="p-2 hover:bg-muted rounded-md text-sm">
                <p>{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground p-4">
              No new notifications
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
