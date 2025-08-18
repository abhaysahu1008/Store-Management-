'use client'
import { useEffect, useState } from "react";
import { User } from "../generated/prisma";
import { GET_ALL_USERS } from "../lib/gql/queries";
import gqlClient from "../services/gql";
import AddProductBtn from "./buttons/addProductBtn";
import ProductsList from "./ProductsList";

export default function StaffManagerDashBoard() {
  // const [users, setUser] = useState<User[]>([]);

  // useEffect(() => {
  //   async function getAllUsers() {
  //     const data: { getAllUsers: User[] } = await gqlClient.request(GET_ALL_USERS);
  //     setUser(data?.getAllUsers || []);
  //   }
  //   getAllUsers();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8 text-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Products Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Products</h1>
            <AddProductBtn />
          </div>
          <ProductsList />
        </div>




      </div>
    </div>
  );
}
