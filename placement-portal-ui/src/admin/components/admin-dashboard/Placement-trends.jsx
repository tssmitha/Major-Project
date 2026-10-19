import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const placementTrendData = [
  {
    year: "2021–22",
    eligible: 480,
    placed: 320,
    placementRate: 66.7,
  },
  {
    year: "2022–23",
    eligible: 520,
    placed: 356,
    placementRate: 68.5,
  },
  {
    year: "2023–24",
    eligible: 560,
    placed: 372,
    placementRate: 66.4,
  },
  {
    year: "2024–25",
    eligible: 580,
    placed: 403,
    placementRate: 69.5,
  },
  {
    year: "2025–26",
    eligible: 612,
    placed: 428,
    placementRate: 69.9,
  },
];

export default function PlacementTrend() {
  return (
    <section className="admin-dashboard-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Placement trend</h2>
          <p>
            Eligible and placed students across academic years.
          </p>
        </div>
      </div>

      <div className="admin-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={placementTrendData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
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
              yAxisId="students"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
            />

            <YAxis
              yAxisId="rate"
              orientation="right"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 13 }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value, name) => {
                if (name === "Placement rate") {
                  return [`${value}%`, name];
                }

                return [value, name];
              }}
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
                wrapperStyle={{
                    paddingBottom: "24px",
                }}
            />

            <Bar
              yAxisId="students"
              dataKey="eligible"
              name="Eligible students"
              fill="#153d68"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />

            <Bar
              yAxisId="students"
              dataKey="placed"
              name="Students placed"
              fill="#78aee8"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />

            <Line
              yAxisId="rate"
              type="monotone"
              dataKey="placementRate"
              name="Placement rate"
              stroke="#d6a21e"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#d6a21e",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}