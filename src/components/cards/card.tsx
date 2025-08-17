import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { UserContext } from '../context/user-context'
import Link from 'next/link'

const Cards = ({ user }) => {

  return (
    <div>
      <Link href={"/profile"}>
        <Box maxWidth="240px">
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                radius="full"
                fallback="T"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {user.name}
                </Text>
                <Text as="div" size="2" color="gray">
                  {user.role}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Link>

    </div>
  )
}

export default Cards
