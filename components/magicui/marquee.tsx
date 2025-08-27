"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Marquee = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    reverse?: boolean;
    pauseOnHover?: boolean;
  }
>(({ className, reverse, pauseOnHover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex overflow-hidden [--duration:40s] [--gap:1rem]",
      className
    )}
    style={{
      "--gap": "1rem",
    } as React.CSSProperties}
  >
    <div
      className={cn(
        "flex min-w-fit shrink-0 justify-around gap-[--gap]",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
      style={{
        animationDuration: "var(--duration)",
        animationPlayState: pauseOnHover ? "paused" : "running",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {props.children}
    </div>
    <div
      className={cn(
        "flex min-w-fit shrink-0 justify-around gap-[--gap]",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
      style={{
        animationDuration: "var(--duration)",
        animationPlayState: pauseOnHover ? "paused" : "running",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      aria-hidden
    >
      {props.children}
    </div>
  </div>
));
Marquee.displayName = "Marquee";

export { Marquee };
