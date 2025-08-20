'use client'
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { LOGIN_USER } from "../../lib/gql/queries";
import gqlClient from "../../services/gql";
// import Signup from "./signup";
import Link from "next/link";

export default function Login() {

  const [userCred, setUserCred] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError({});
    setLoading(true);

    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password: Password
      });

      if (data.loginUser) {
        window.location.href = "/DashBoard";
        alert("Logged in");
      } else {
        setError({ message: "Invalid credentials" });
      }
    } catch (error) {
      setError({ message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-gray-900 min-h-screen flex justify-center items-center">
      <Card
        style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#1f2937" }}
        className="p-8 rounded-2xl shadow-lg w-96"
      >
        <div className="relative h-16 w-16 rounded-full my-5">
          <Image
            fill
            src="https://th.bing.com/th/id/OIP.NT3pICd1d6YlO9iSHoQflgHaHa?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="Store Management Logo"
          />
        </div>

        <TextField.Root
          value={userCred}
          onChange={e => setUserCred(e.target.value)}
          placeholder="Username or Email"
          className="w-full mb-3 text-white bg-gray-800 rounded px-3 py-2 placeholder-gray-400"
        />

        <TextField.Root
          value={Password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full mb-3 text-white bg-gray-800 rounded px-3 py-2 placeholder-gray-400"
        />

        {error.message && <Text style={{ color: "#f87171" }} className="mb-2">{error.message}</Text>}

        <Button
          disabled={loading}
          onClick={handleLogin}
          style={{ width: "100%", marginTop: 10 }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          <Text>Log in</Text>
        </Button>
        <div className="text-gray-300 text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </Card>

    </main>
  );
}
