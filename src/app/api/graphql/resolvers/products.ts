import { ProductCategory } from "../../../../generated/prisma";
import { prisma } from "../../../../services/prisma";

export async function addProduct(_: any, args: {
  title: string,
  description: string,
  category: ProductCategory,
  price: number,
  stock: number,
  imageUrl: string
}) {
  try {

    const createdProduct = await prisma.product.create({
      data: args
    })
    return createdProduct;

  } catch (error) {
    return null;
  }
}


export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function productPage(_: any, args: {
  id: string
}) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: args.id
      },
    })

    if (product) return product;
    return null;
  } catch (error) {
    return null;
  }
}


// export async function createSale(_: any, args: {
//   id: string,
//   quantity: number
// }) {
//   try {
//     const sale = await prisma.sale.create({
//       data: {
//         productId: args.id,
//         quantity: args.quantity
//       }
//     })
//     if (sale) {
//       await prisma.product.update({
//         where: {
//           id: args.id,
//         },
//         data: {
//           stock: {
//             decrement: args.quantity
//           }
//         }
//       })
//     }

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export async function createSale(_: any, args: {
  id: string,
  quantity: number
}) {

  try {

    const sale = await prisma.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity
      }
    })

    if (sale) {
      await prisma.product.update({
        where: {
          id: args.id
        },
        data: {
          stock: {
            decrement: args.quantity
          }
        }
      })
    }
    return true;

  } catch (error) {
    return false;
  }

}


export async function getAllSales(_: any, args: {
  productId: string
}) {

  const sales = await prisma.sale.findMany({
    where: {
      productId: args.productId
    },
    orderBy: {
      createdAt: "asc"
    }
  })
  return sales;
}
