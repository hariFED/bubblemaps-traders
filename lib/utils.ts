import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates an Ethereum address for display
 *
 * @param address - The full address
 * @param startChars - Number of characters to show at start
 * @param endChars - Number of characters to show at end
 * @returns Truncated address
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address) return ""
  if (address.length <= startChars + endChars) return address

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}
