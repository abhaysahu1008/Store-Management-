'use client'
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import gqlClient from "../../services/gql";
import { CREATE_PRODUCT } from "../../lib/gql/mutation";
import { Product } from "../../generated/prisma";

export default function () {

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleAddProd() {
    try {

      const data: { addProduct: Product } = await gqlClient.request(CREATE_PRODUCT, {
        title,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
        imageUrl
      })

      const product = data?.addProduct;
      if (!product) {
        alert("Product created successfully");
      }
      else {
        alert("Product creation failed");
      }

    } catch (error) {
      alert("something went wrong");
    }

  }



  return (

    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add a product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add a new product
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Root
                value={description}
                onChange={e => setDesc(e.target.value)}
                placeholder="Enter description"
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Price
              </Text>
              <TextField.Root
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Stock
              </Text>
              <TextField.Root
                value={stock}
                onChange={e => setStock(e.target.value)}
                placeholder="Enter stock"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Image Url
              </Text>
              <TextField.Root
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </label>

            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger placeholder="Select category" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Category</Select.Label>
                  <Select.Item value="electronics">Electronics</Select.Item>
                  <Select.Item value="clothing">Clothing</Select.Item>
                  <Select.Item value="furniture">Furniture</Select.Item>
                  <Select.Item value="food">Food</Select.Item>
                  <Select.Item value="beauty">Beauty</Select.Item>
                  <Select.Item value="accessories">Accessories</Select.Item>
                  <Select.Item value="description">Description</Select.Item>
                  <Select.Item value="others">Others</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleAddProd}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
