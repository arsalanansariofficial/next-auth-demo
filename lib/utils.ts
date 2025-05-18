import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function comparePassword(password: string, hashedPassword: string) {
  return hashPassword(password) === hashedPassword;
}
