"use client"

import { createContext, ReactNode } from "react";
import { RoleType } from "../../generated/prisma";

type UserWithoutPassword = {
  id: string,
  name: string,
  email: string,
  username: string,
  avatar: string | null,
  role: RoleType
}

export const UserContext = createContext<{
  user?: UserWithoutPassword
}>({});

export default function UserProvider({ children, user }: { children: ReactNode, user: UserWithoutPassword }) {

  console.log("USER", user)
  return (
    <>
      <UserContext.Provider value={{ user }}>


        {children}



      </UserContext.Provider>

    </>
  )
}
