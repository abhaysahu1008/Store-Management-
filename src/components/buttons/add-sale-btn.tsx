import { useState } from "react";
import gqlClient from "../../services/gql";
import { CREATE_SALE } from "../../lib/gql/mutation";

export default function AddSaleButton({ product }) {
  const [quantity, setQuantity] = useState(1);

  async function handleSale() {
    if (product.stock < quantity) {
      alert("Sale quantity cannot be more than avl stock");
      return;
    }

    const data = await gqlClient.request(CREATE_SALE, {
      id: product.id,
      quantity,
    });

    if (data?.createSale) {
      alert("Success");
    }
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <input
        type="number"
        placeholder="Add quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number.parseInt(e.target.value, 10))}
        className="w-24 px-2 py-1 border border-gray-300 rounded-md bg-gray-100 text-black"
      />

      <button
        onClick={handleSale}
        className="px-4 py-1 rounded-md bg-gray-900 text-white"
      >
        Add to sale
      </button>
    </div>
  );
}
