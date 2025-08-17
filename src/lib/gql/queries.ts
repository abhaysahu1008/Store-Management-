// import { gql } from "graphql-request";

import { gql } from "graphql-request"

// export const LOGIN_USER = gql`
// query Query($userCred: String!, $password: String!) {
//   loginUser(userCred: $userCred, password: $password)
// }
// `

// export const GET_ALL_USERS = gql`
// query Query {
//   getAllUsers {
//     id
//     name
//     username
//     email
//     avatar
//     role
//   }
// }
// `

// export const GET_ALL_PRODUCTS = gql`
// query Query {
//   getAllProducts {
//     id
//     title
//     description
//     category
//     price
//     stock
//     imageUrl
//   }
// }
// `

// export const GET_PRODUCT = gql`
//   query Query($productPageId: String) {
//   productPage(id: $productPageId) {
//     id
//     title
//     description
//     category
//     price
//     stock
//     imageUrl
//   }
// }
// `





export const LOGIN_USER = gql`
  query LoginUser($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      username
      email
      avatar
      role
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($productPageId: String) {
    productPage(id: $productPageId) {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`
export const GET_ALL_SALES = gql`
  query GetAllSales($productId: ID!) {
  getAllSales(productId: $productId) {
    id
    productId
    quantity
    createdAt
  }
}
`
