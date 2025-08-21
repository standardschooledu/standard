import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import Cookies from "js-cookie";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetch_function(
  endpoint: string,
  method: string,
  data?: any
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      "apikey": `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
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