export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    cache: options?.cache || "no-store",
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const currentPath = window.location.pathname;
      const encodedPath = encodeURIComponent(currentPath);
      window.location.href = `/admin/login?callbackUrl=${encodedPath}&sessionExpired=true`;
    }
    throw new Error("Session expired. Please log in again.");
  }

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
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}
