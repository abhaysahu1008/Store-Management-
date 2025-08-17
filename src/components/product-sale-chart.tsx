import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import gqlClient from "../services/gql";
import { GET_ALL_SALES } from "../lib/gql/mutation";


export default function ProductSaleChart({ productId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const res = await gqlClient.request(GET_ALL_SALES, { productId });
      console.log(res);


      // Transform data for the chart
      const chartData = res.getAllSales.map((sale: any) => ({
        name: new Date(Number(sale.createdAt)).toLocaleDateString(),
        quantity: sale.quantity,
      }));

      console.log("Chart Data:", chartData);


      setData(chartData);
    }

    fetchSales();
  }, [productId]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
