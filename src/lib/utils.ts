import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHeaderText(pathname: string) {
  if (pathname === "/" || pathname === "/core") {
    return "Dashboard";
  } else {
    // Extract the last part of the path, strip "/" and capitalize the first letter
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
      : "Dashboard";
  }
}
