'use client'
import { useContext } from "react";
import AdminDashboard from "../../components/AdminDashboard";
import { UserContext } from "../../components/context/user-context";
import AddUserButton from "../../components/buttons/add-user-btn";

export default function Home() {

  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <main >

        {user?.role.toLowerCase() == "admin" && <AdminDashboard />}

      </main>
    </div>
  );
}
