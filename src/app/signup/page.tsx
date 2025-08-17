'use client';
import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("staff");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userData = { name, email, username, password, avatar, role };
    console.log(userData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />
      <input
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />

      {/* Radix UI RadioGroup */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Select a role</h3>
        <RadioGroup.Root
          className="flex gap-4"
          value={role}
          onValueChange={setRole}
        >
          <label className="flex items-center gap-2">
            <RadioGroup.Item
              value="admin"
              className="w-4 h-4 shrink-0 rounded-full border border-gray-400 data-[state=checked]:bg-gray-900"
            />
            Admin
          </label>
          <label className="flex items-center gap-2">
            <RadioGroup.Item
              value="manager"
              className="w-4 h-4 shrink-0 rounded-full border border-gray-400 data-[state=checked]:bg-gray-900"
            />
            Manager
          </label>
          <label className="flex items-center gap-2">
            <RadioGroup.Item
              value="staff"
              className="w-4 h-4 shrink-0 rounded-full border border-gray-400 data-[state=checked]:bg-gray-900"
            />
            Staff
          </label>
        </RadioGroup.Root>
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-gray-900 text-white"
      >
        Create User
      </button>
    </form>
  );
}
