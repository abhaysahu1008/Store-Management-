'use client'
import React, { useEffect, useState } from 'react';
import { Product } from '../generated/prisma';
import gqlClient from '../services/gql';
import { GET_ALL_PRODUCTS } from '../lib/gql/queries';
import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';

const ProductsList = () => {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function getAllProds() {
      const prodData: { getAllProducts: Product[] } = await gqlClient.request(GET_ALL_PRODUCTS);
      setProduct(prodData?.getAllProducts || []);
    }
    getAllProds();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((prod) => (
        <Link href={`/productPage/${prod.id}`}
          key={prod.id}
          className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-lg flex items-center gap-4 hover:border-indigo-500 hover:shadow-indigo-500/30 transition-all duration-200"
        >
          <Avatar
            size="3"
            src={prod.imageUrl}
            radius="full"
            fallback={prod.title.charAt(0).toUpperCase()}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{prod.title}</h3>
            <p className="text-sm text-gray-400">{prod.description}</p>
          </div>
        </Link>
      ))
      }
    </div >
  );
};

export default ProductsList;
