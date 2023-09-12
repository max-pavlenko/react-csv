export function isNonNullishArray<T extends unknown>(arr: T[]): arr is Array<NonNullable<T>> {
   return Array.isArray(arr) && arr.every(Boolean);
}
