export function toCsvString(arr: Record<string, any>[]) {
   return `data:text/csv;charset=utf-8,${arr.reduce((prev, curr) => `${prev}${Object.values(curr).join(",")}\n`, '')}`
}
