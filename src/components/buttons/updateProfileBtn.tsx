'use client'
import React, { useState } from 'react';
import gqlClient from '../../services/gql';
import { UPDATE_USER_PROFILE } from '../../lib/gql/mutation';

const UpdateProfileBtn = ({ user }) => {
  const [modal, setModal] = useState(false);

  // Pre-fill state with existing user info
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [bio, setBio] = useState(user?.Profile?.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.Profile?.phoneNumber || '');

  const openModal = () => setModal(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await gqlClient.request(UPDATE_USER_PROFILE, {
        userId: user?.id,
        name,
        username,
        email,
        avatar,
        bio,
        phoneNumber
      });

      if (data.updateUserProfile) {
        console.log('Profile updated successfully');
        setModal(false); // close modal
      } else {
        console.log('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div>
      <button
        onClick={openModal}
        className='text-white font-semibold bg-blue-500 p-2 rounded-lg'
      >
        Update Profile
      </button>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder='Avatar URL'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder='Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder='Phone number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type='button'
                  onClick={openModal}
                  className="px-4 py-2 rounded bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfileBtn;
