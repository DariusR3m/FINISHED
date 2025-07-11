import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    critical: 4000,
    high: 2400,
    medium: 2400,
    low: 1000,
  },
  {
    name: "Mon",
    critical: 2293,
    high: 2698,
    medium: 4673,
    low: 4198,
  },
  {
    name: "Tue",
    critical: 1347,
    high: 2891,
    medium: 4765,
    low: 3620,
  },
  {
    name: "Wed",
    critical: 4123,
    high: 1756,
    medium: 3890,
    low: 2478,
  },
  {
    name: "Thu",
    critical: 1984,
    high: 4532,
    medium: 3207,
    low: 2675,
  },
  {
    name: "Fri",
    critical: 1189,
    high: 4012,
    medium: 2397,
    low: 3644,
  },
  {
    name: "Sat",
    critical: 1433,
    high: 2056,
    medium: 4870,
    low: 2761,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Alert Analysis</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="low"
              stackId="1"
              stroke="#eee900"
              fill="#eee900"
            />
            <Area
              type="monotone"
              dataKey="medium"
              stackId="1"
              stroke="#ff9900"
              fill="#ff9900"
            />
            <Area
              type="monotone"
              dataKey="high"
              stackId="1"
              stroke="#FF0000"
              fill="#FF0000"
            />

            <Area
              type="monotone"
              dataKey="critical"
              stackId="1"
              stroke="#8B0000"
              fill="#8B0000"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;