"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ServerToastProps {
  message: string | null;
  variant?: "default" | "destructive";
}

export default function ServerToast({
  message,
  variant = "destructive",
}: ServerToastProps) {
  const { toast } = useToast();

  useEffect(
    () => {
      if (message) {
        toast({
          title: variant === "destructive" ? "Error" : "Notification",
          description: message,
          variant: variant,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [message]
  );

  return null;
}
