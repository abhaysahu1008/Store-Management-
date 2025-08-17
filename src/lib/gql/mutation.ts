import { gql } from "graphql-request";

export const CREATE_USER = gql`
mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!, $role: String!) {
  createUser(name: $name, email: $email, username: $username, password: $password, role: $role) {
    id
    name
    username
    email
    avatar
    role
  }
}
`

export const CREATE_PRODUCT = gql`

mutation Mutation($title: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imageUrl: String!) {
  addProduct(title: $title, description: $description, category: $category, price: $price, stock: $stock, imageUrl: $imageUrl) {
    id
    title
    description
    category
    price
    stock
    imageUrl
  }
}`





export const CREATE_SALE = gql`
mutation Mutation($id: String, $quantity: Int) {
  createSale(id: $id, quantity: $quantity)
}
`;

export const GET_ALL_SALES = gql`
query Query($productId: ID!) {
  getAllSales(productId: $productId) {
    id
    productId
    quantity
    createdAt
  }
}
`;
