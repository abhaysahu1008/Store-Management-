import { redirect } from "next/navigation";
import { getUserFromCookies } from "../../../helper/helper";
import AdminDashboard from "../../../components/AdminDashboard";
import StaffManagerDashBoard from "../../../components/Staff-Manager-Dashboard";


export default async function DashboardPage() {
  const user = await getUserFromCookies();

  if (!user) {
    redirect("/");
  }

  if (user.role?.toLowerCase() === "admin") {
    return <AdminDashboard />;
  }

  if (["manager", "staff"].includes(user.role?.toLowerCase())) {
    return <StaffManagerDashBoard />;
  }

  redirect("/");
}
