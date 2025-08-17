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
  name: string,
  username: string,
  email: string,
  avatar: string,
  userId: string,

}) {

  try {
    const dataToSave = {
      name: args.name,
      email: args.email,
      avatar: args.avatar,
      username: args.username
    }

    const user = await getUserFromCookies();
    if (user?.role !== "admin" && user?.id !== args.userId) return false;
    // if (user?.role !== "admin" && user?id !== args.userId) return false;

    await prisma.user.update({
      where: {
        id: args.userId
      },
      data: dataToSave
    })
    return true;
  }
  catch (error) {
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

// export async function createProfile(_: any, args: {
//   bio: string,
//   phoneNumber: string
// }) {

//   const profile = await prisma.profile.create({
//     data: {
//       bio: args.bio,
//       phoneNumber: args.phoneNumber
//     },
//     include: {
//       user: {

//       }
//     }
//   })



// }

export async function getMyProfile(_: any, args: {

})
