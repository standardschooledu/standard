import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import Cookies from "js-cookie";


// src/lib/utils.ts
export function getEducationalLevelDisplayName(level: string): string {
  switch (level) {
    case "primary":
      return "Primary School";
    case "secondary":
      return "Secondary School";
    case "tertiary":
      return "Tertiary Institution";
    default:
      return level; // fallback
  }
}

// src/lib/utils.ts

/**
 * Get initials from a full name
 */
export function getInitials(name: string): string {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (
    words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
  );
}

/**
 * Map stream codes to display names
 */
export function getStreamDisplayName(stream: string): string {
  switch (stream.toLowerCase()) {
    case "science":
      return "Science";
    case "arts":
      return "Arts";
    case "commerce":
      return "Commerce";
    default:
      return stream;
  }
}

/**
 * Map stream codes to Tailwind badge colors
 */
export function getStreamBadgeColor(stream: string): string {
  switch (stream.toLowerCase()) {
    case "science":
      return "bg-green-100 text-green-800";
    case "arts":
      return "bg-purple-100 text-purple-800";
    case "commerce":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Map grade letters/numbers to Tailwind colors
 */
export function getGradeColor(grade: string): string {
  switch (grade.toUpperCase()) {
    case "A":
      return "text-green-600 font-bold";
    case "B":
      return "text-blue-600 font-semibold";
    case "C":
      return "text-yellow-600";
    case "D":
      return "text-orange-600";
    case "F":
      return "text-red-600 font-bold";
    default:
      return "text-gray-600";
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetch_function(
  endpoint: string,
  method: string,
  data?: any,
  baseUrl?: string
) {

  const auth_token = localStorage.getItem(`sb-${process.env.NEXT_PUBLIC_PROJECT_ID}-auth-token`)

  const res = await fetch(`${baseUrl || process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      "apikey": `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(data),
  });

  let return_data;

  if (!res.ok) {
    throw new Error("invalid credentials");
  } else {
    return_data = await res.json();
  }

  return return_data;
}

