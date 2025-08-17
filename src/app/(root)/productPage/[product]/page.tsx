'use client';

import { gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import gqlClient from '@/services/gql';
import { use } from 'react'; // Needed for unwrapping params in Next 15+
import AddSaleButton from '../../../../components/buttons/add-sale-btn';
import { Product } from '../../../../generated/prisma';
import ProductSaleChart from '../../../../components/product-sale-chart';

const GET_PRODUCT = gql`
  query ProductPage($productPageId: String) {
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
`;

export default function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = use(params);

  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await gqlClient.request(GET_PRODUCT, { productPageId: product });
        setProductData(data.productPage);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [product]);

  if (!productData) {
    return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 space-y-8">
      {/* Top Section: Product Image + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg">
          {productData.imageUrl ? (
            <img
              src={productData.imageUrl}
              alt={productData.title}
              className="max-h-[500px] object-contain"
            />
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{productData.title}</h1>
          <p className="text-sm text-gray-500">{productData.category}</p>
          <p className="text-lg text-green-700 font-semibold">₹{productData.price}</p>
          <p className="text-sm text-gray-700">{productData.description}</p>
          <p
            className={`text-sm font-medium ${productData.stock > 0 ? 'text-green-600' : 'text-red-500'
              }`}
          >
            {productData.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Buttons like Amazon */}
          <div className="flex gap-4 mt-4">


            <AddSaleButton product={productData} />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-[300px]">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Trend</h2>
        <ProductSaleChart productId={productData.id} />
      </div>
    </div>
  );
}
