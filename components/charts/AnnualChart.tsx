"use client";
import React, { PureComponent } from "react";
import { LineChartData } from "@/constants/charts/LineChartsData";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useTheme } from "next-themes";

export default function AnnualChart() {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={LineChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke={
            theme === "light"
              ? "hsl(270 66.67% 47.06%)"
              : "hsl(212.02 100% 46.67%)"
          }
        />
        <YAxis
          stroke={
            theme === "light"
              ? "hsl(270 66.67% 47.06%)"
              : "hsl(212.02 100% 46.67%)"
          }
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="transactions"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="successFulTransaction"
          stroke="#17C964"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
