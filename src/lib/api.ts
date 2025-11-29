export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    // This forces TanStack Query to go into 'isError' state
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) return {} as T;

  return response.json();
}
