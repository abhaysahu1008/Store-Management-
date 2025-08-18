'use client';
import React, { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';
import * as RadioGroup from '@radix-ui/react-radio-group';
import gqlClient from '../../services/gql';
import { CREATE_USER } from '../../lib/gql/mutation';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("staff");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await gqlClient.request(CREATE_USER, {
      name,
      username,
      email,
      avatar,
      role
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-gray-900 rounded-2xl">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />

      <div className="flex flex-col gap-2">
        <Text size="2" weight="semibold" className="text-white">Select a role</Text>
        <RadioGroup.Root
          className="flex gap-4"
          value={role}
          onValueChange={setRole}
        >
          {['admin', 'manager', 'staff'].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-white">
              <RadioGroup.Item
                value={r}
                className="w-5 h-5 rounded-full border border-gray-400 data-[state=checked]:bg-gray-100"
              />
              <Text className="capitalize">{r}</Text>
            </label>
          ))}
        </RadioGroup.Root>
      </div>

      <Button type="submit" variant="filled" color="gray">
        <Text>Create User</Text>
      </Button>
    </form>
  );
}
