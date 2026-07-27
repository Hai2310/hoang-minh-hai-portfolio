"use client";

import Image from "next/image";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export function ProfileAvatar({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Avatar className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface-2", className)}>
      <Image
        src={siteConfig.profileImage.path}
        alt={siteConfig.profileImage.alt}
        fill
        priority
        sizes="(max-width: 1024px) 240px, 280px"
        className="object-cover object-center"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
