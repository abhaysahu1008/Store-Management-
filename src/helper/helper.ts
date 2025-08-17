import { cookies } from "next/headers";
import { verifyToken } from "../services/jwt";
import { prisma } from "../services/prisma";

export async function getUserFromCookies() {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const data = verifyToken(token);

    if (!data?.id) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: data?.id
      },
      omit: {
        password: true
      }
    })

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
}
