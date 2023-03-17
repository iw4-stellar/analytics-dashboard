
export function setLocalStorageValue(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorageValue<T>(key: string): T {
  const value = localStorage.getItem(key)

  return value !== null ? JSON.parse(value) : null
}