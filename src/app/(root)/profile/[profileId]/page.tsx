import React from 'react';
import { getUserFromCookies } from '../../../../helper/helper';
import { prisma } from '../../../../services/prisma';
import UpdateProfileBtn from '../../../../components/buttons/updateProfileBtn';

const Page = async ({ params }) => {
  const user = await getUserFromCookies();
  console.log(user);

  const { profileId } = params;
  console.log(profileId);

  const userInfo = await prisma.user.findUnique({
    where: { id: profileId },
    include: { Profile: true },
  });
  console.log(userInfo);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={userInfo?.avatar || '/default-avatar.png'}
            alt={userInfo?.name}
            className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold">{userInfo?.name}</h2>
          <p className="text-gray-400">{userInfo?.role}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-gray-300 font-medium">Bio</h3>
            <p className="text-gray-100">{userInfo?.Profile?.bio || 'No bio available'}</p>
          </div>

          <div>
            <h3 className="text-gray-300 font-medium">Phone</h3>
            <p className="text-gray-100">{userInfo?.Profile?.phoneNumber || 'Not provided'}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <UpdateProfileBtn user={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Page;
