'use client'
import { useEffect, useState } from "react";
import { User } from "../generated/prisma";
import { GET_ALL_USERS } from "../lib/gql/queries";
import gqlClient from "../services/gql";
import AddUserButton from "./buttons/add-user-btn";
import Cards from "./cards/card";
import AddProductBtn from "./buttons/addProductBtn";
import ProductsList from "./ProductsList";

export default function AdminDashboard() {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      const data: { getAllUsers: User[] } = await gqlClient.request(GET_ALL_USERS);
      setUser(data?.getAllUsers || []);
    }
    getAllUsers();
  }, []);

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

        {/* Users Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Team Members</h2>
            <AddUserButton />
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-700 rounded-lg border border-gray-600"
              >
                <Cards user={user} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
