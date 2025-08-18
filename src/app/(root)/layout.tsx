import { ReactNode } from "react";
import Header from "../../components/Header";


export default async function Layout({ children }: {
  children: ReactNode
}) {


  return (
    <>

      <Header />
      {children}

    </>
  )
}
