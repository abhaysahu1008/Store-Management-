import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import gqlClient from "../services/gql";
import { GET_ALL_SALES } from "../lib/gql/mutation"; // If this is a query, move it to queries

interface ProductSaleChartProps {
  productId: string;
}

interface Sale {
  createdAt: string | number;
  quantity: number;
}

interface ChartData {
  name: string;
  quantity: number;
}

interface GetAllSalesResponse {
  getAllSales: Sale[];
}

export default function ProductSaleChart({ productId }: ProductSaleChartProps) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function fetchSales() {
      try {
        const res: GetAllSalesResponse = await gqlClient.request(GET_ALL_SALES, { productId });

        // Transform data for the chart
        const chartData = res.getAllSales.map((sale) => ({
          name: new Date(Number(sale.createdAt)).toLocaleDateString(),
          quantity: sale.quantity,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
        setData([]);
      }
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
