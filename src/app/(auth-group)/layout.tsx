import { redirect } from "next/navigation";
import { ReactNode } from "react";
import UserProvider from "../../components/context/user-context";
import Header from "../../components/Header";
import { getUserFromCookies } from "../../helper/helper";

export default async function Layout({ children }: {
  children: ReactNode
}) {
  const user = await getUserFromCookies();
  if (!user) redirect("/login")

  return (
    <>
      <UserProvider user={user}>
        <Header />
        {children}
      </UserProvider>
    </>
  )
}
