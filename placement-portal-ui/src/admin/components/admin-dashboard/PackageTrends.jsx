import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const packageTrendData = [
  { year: "2021–22", highest: 24, average: 8.2, median: 6 },
  { year: "2022–23", highest: 32, average: 9.4, median: 6.8 },
  { year: "2023–24", highest: 36, average: 10.1, median: 7.5 },
  { year: "2024–25", highest: 42, average: 11.8, median: 8.9 },
  { year: "2025–26", highest: 48, average: 13.6, median: 10.4 },
];

export default function PackageTrend() {
  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Package trend</h2>
          <p>
            Highest, average and median CTC across academic years.
          </p>
        </div>
      </div>

      <div className="admin-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={packageTrendData}
            margin={{ top: 20, right: 24, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#e8edf3"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              unit=" LPA"
            />

            <Tooltip
              formatter={(value, name) => [
                `${value} LPA`,
                name,
              ]}
              contentStyle={{
                border: "1px solid #dfe5ec",
                borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(6, 27, 54, 0.08)",
              }}
            />

            <Legend
              position="top"
              layout="horizontal"
              offset={8}
              iconType="circle"
              wrapperStyle={{ paddingBottom: "24px" }}
            />

            <Line
              type="monotone"
              dataKey="highest"
              name="Highest CTC"
              stroke="#d6a21e"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            <Line
              type="monotone"
              dataKey="average"
              name="Average CTC"
              stroke="#153d68"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            <Line
              type="monotone"
              dataKey="median"
              name="Median CTC"
              stroke="#78aee8"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}