import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const WeightLineChart = ({ koiGrowthLogs }) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (koiGrowthLogs && koiGrowthLogs.length > 0) {
      const data = koiGrowthLogs
        .slice(Math.max(koiGrowthLogs.length - 10, 0))
        .map((log) => ({
          date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }), // Format date as "25 Aug 2023"
          weight: log.weight, // Assuming `weight` is in kg
        }));
      setFormattedData(data);
    }
  }, [koiGrowthLogs]);
  return (
    <ResponsiveContainer width={400} height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="linear"
          dataKey="weight"
          stroke="#000000"
          activeDot={{ r: 10 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
