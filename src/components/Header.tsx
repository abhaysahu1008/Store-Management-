'use client'
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useContext } from 'react'
import { UserContext } from './context/user-context'
import Link from 'next/link';
import AddProfileBtn from './buttons/addProfileBtn';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='flex justify-between p-3 bg-gray-950'>

      <img src="https://th.bing.com/th/id/OIP.NT3pICd1d6YlO9iSHoQflgHaHa?w=168&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" className='h-[50px] w-[50px]' alt="" />

      {/* ▼ Dropdown  */}
      <AddProfileBtn />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Box maxWidth="240px" className="cursor-pointer">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={user?.avatar || ""}
                  radius="full"
                  fallback={user?.name?.charAt(0) || "U"}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {user?.name || "USERNAME"}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {user?.role}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </DropdownMenu.Trigger>


        <DropdownMenu.Content className="bg-gray-800 shadow rounded-md p-2 text-gray-100">
          <DropdownMenu.Item className="px-3 py-1 cursor-pointer hover:bg-gray-700 rounded">
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-3 py-1 cursor-pointer hover:bg-gray-700 rounded">
            <Link href={"/signup"}>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>

      </DropdownMenu.Root>
    </div>
  )
}

export default Header
