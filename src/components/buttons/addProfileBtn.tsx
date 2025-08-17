'use client'
import { useState } from 'react'
import { Dialog, Flex, Text, TextField, Button } from "@radix-ui/themes";

const AddProfileBtn = () => {

  const [openProfile, setOpenProfile] = useState(false);
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleProfile() {
    setOpenProfile(prev => !prev);
  }

  async function handleCreateProfile() {

    console.log({ bio, phoneNumber });

    setOpenProfile(false);
  }

  return (
    <div>
      <div className='mt-[15px]'>
        <Button onClick={handleProfile}>Create profile</Button>
      </div>

      {openProfile && (
        <Dialog.Root open={openProfile}>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Create Profile</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Add your profile information
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Bio
                </Text>
                <TextField.Root
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Enter bio"
                />
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Phone Number
                </Text>
                <TextField.Root
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" onClick={() => setOpenProfile(false)}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={handleCreateProfile}>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
}

export default AddProfileBtn;
