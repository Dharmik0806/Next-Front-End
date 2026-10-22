"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({
  position = "top-right",
  closeButton = true,
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={position}
      closeButton={closeButton}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-400 shrink-0" />,
        info: <InfoIcon className="size-4 text-blue-400 shrink-0" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-400 shrink-0" />,
        error: <OctagonXIcon className="size-4 text-rose-400 shrink-0" />,
        loading: <Loader2Icon className="size-4 animate-spin text-neutral-400 shrink-0" />,
      }}
      style={
        {
          "--normal-bg": "#171717",
          "--normal-text": "#ffffff",
          "--normal-border": "#2e2e2e",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group font-sans !bg-[#171717] !text-white !border-[#2e2e2e] shadow-2xl rounded-xl p-4 gap-3 border",
          title: "!text-white font-medium text-sm",
          description: "!text-neutral-400 text-xs mt-0.5",
          actionButton:
            "!bg-white !text-[#171717] hover:!bg-neutral-200 text-xs font-medium px-2.5 py-1.5 rounded-md",
          cancelButton:
            "!bg-[#262626] !text-white hover:!bg-[#333333] text-xs font-medium px-2.5 py-1.5 rounded-md",
          closeButton:
            "!bg-[#262626] !text-neutral-400 hover:!text-white !border-[#383838] hover:!bg-[#333333] transition-colors",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
export { toast } from "sonner";
