export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-store",
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: Failed to fetch data from ${endpoint}`;

    if (isJson) {
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        console.error("Failed to parse error JSON:", e);
      }
    } else {
      errorMessage = `Server Error: ${res.status} ${res.statusText} at ${endpoint}`;
    }

    throw new Error(errorMessage);
  }

  if (isJson) {
    return res.json();
  }

  return {} as T;
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}
