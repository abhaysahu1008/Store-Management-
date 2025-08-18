import { cookies } from "next/headers";
import { signToken } from "../../../../services/jwt";
import { prisma } from "../../../../services/prisma";
import { getUserFromCookies } from "../../../../helper/helper";
import { RoleType } from "../../../../generated/prisma";

export async function loginUser(_: any, args: {
  userCred: string,
  password: string
}) {

  try {

    const cookieStore = cookies();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: args.userCred
          },
          {
            username: args.userCred
          }
        ]
      }
    })

    if (!user) {
      return false;
    }
    if (user.password === args.password) {
      const token = signToken({ id: user.id });
      cookieStore.set("token", token);
      return true;
    }
    else {
      return false;
    }

  } catch (error) {
    return false;
  }
}


export async function createUser(_: any, args: {
  name: string,
  email: string,
  username: string,
  password: string,
  role: RoleType
}) {

  try {
    const user = await getUserFromCookies();
    if (!user) return null;

    if (user.role != "admin") return null;

    const newUser = await prisma.user.create({
      data: args
    })
    return newUser;

  } catch (error) {
    return null;
  }

}

export async function updateUserRole(_: any, args: {
  userId: string,
  role: RoleType
}) {

  //   const user = await getUserFromCookies();
  //   if (user?.role !== "admin") return false;

  //   const UpdatedUser = await prisma.user.update({
  //     where: {
  //       id: args.userId
  //     },
  //     data: {
  //       role: args.role
  //     }
  //   })

  //   return true;;

  // } catch (error) {
  //   return null;
  // }

  try {

    const user = await getUserFromCookies();
    if (!user) return false;

    if (user.role !== "admin") return false;

    await prisma.user.update({
      where: {
        id: args.userId
      },
      data: {
        role: args.role
      }
    })

    return true;
  }
  catch (error) {
    return false;
  }
}


export async function updateUserProfile(_: any, args: {
  userId: string,
  name: string,
  username: string,
  email: string,
  avatar: string,
  bio: string,
  phoneNumber: string
}) {
  try {
    const user = await getUserFromCookies();
    if (user?.role !== "admin" && user?.id !== args.userId) return false;

    const profileExists = await prisma.profile.findUnique({
      where: { userId: args.userId }
    });

    if (!profileExists) {
      return false;
    }

    await prisma.user.update({
      where: { id: args.userId },
      data: {
        name: args.name,
        username: args.username,
        email: args.email,
        avatar: args.avatar,
        Profile: {
          update: {
            bio: args.bio,
            phoneNumber: args.phoneNumber
          }
        }
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export async function getAllUsers(_: any, args: {
  role: "staff" | "manager"
}) {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "admin"
        }
      }
    })
    return users;

  } catch (error) {
    return null;
  }
}
