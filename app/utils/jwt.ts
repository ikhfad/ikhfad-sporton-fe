/**
 * Decodes a JWT token and returns the payload as an object.
 * Returns null if the token is malformed.
 */
export function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Payload = token.split(".")[1];
    let payloadStr: string;

    if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
      payloadStr = Buffer.from(base64Payload, "base64").toString("utf8");
    } else {
      payloadStr = atob(base64Payload);
    }

    return JSON.parse(payloadStr);
  } catch {
    return null;
  }
}

/**
 * Checks if the token is expired.
 * If the token has no `exp` claim or is malformed, it's considered expired.
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJwt(token);
  if (!decoded || typeof decoded.exp !== "number") {
    return true;
  }

  return decoded.exp * 1000 < Date.now();
}
