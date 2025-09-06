import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from "crypto-js"

export const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY ?? 'your-very-secure-and-long-secret-key-here-at-least-32-chars'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

export function decrypt(ciphertext: string): string {
  return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}
