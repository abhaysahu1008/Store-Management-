'use client'
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { LOGIN_USER } from "../../lib/gql/queries";
import gqlClient from "../../services/gql";

export default function Page() {

  const [userCred, setUserCred] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLaoding] = useState(false);

  async function handleLogin() {

    setError({});
    setLaoding(true);

    try {

      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password: Password
      })

      if (data.loginUser) {
        window.location.href = "/"
        alert("Logged in")
      } else {
        setError({
          message: "invalid creds"
        })
      }

    } catch (error) {
      setError({
        message: "Something went wrong!"
      })
    } finally {
      setLaoding(false);
    }

  }

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="relative h-16 w-16 rounded-full my-5">
            <Image fill src={"https://th.bing.com/th/id/OIP.NT3pICd1d6YlO9iSHoQflgHaHa?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"} alt="Store Management Logo" />
          </div>
          <TextField.Root value={userCred} onChange={e => setUserCred(e.target.value)} style={{ height: 36 }} className=" w-96 mb-2" placeholder="Username or Email" />
          <TextField.Root value={Password} onChange={e => setPassword(e.target.value)} style={{ height: 36 }} className=" w-96 mb-2" placeholder="Password" />

          {error.message && <Text style={{ color: "red" }}>{error.message}</Text>}

          <Button disabled={loading} onClick={handleLogin} style={{ width: "100%", margin: "20px 0" }}>
            <Text>Log in</Text>
          </Button>
        </Card>
      </div>
    </main>
  )

}
