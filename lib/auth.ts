import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-me"
);
const COOKIE_NAME = "extimate_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function clearSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export { COOKIE_NAME };
export const authSecret = secret;
