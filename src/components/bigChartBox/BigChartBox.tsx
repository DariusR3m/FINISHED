import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { alertAnalysisData } from "../../data";
import "./bigChartBox.scss";

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Alert Analysis</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={alertAnalysisData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="low" stackId="1" stroke="#eee900" fill="#eee900" />
            <Area type="monotone" dataKey="medium" stackId="1" stroke="#ff9900" fill="#ff9900" />
            <Area type="monotone" dataKey="high" stackId="1" stroke="#FF0000" fill="#FF0000" />
            <Area type="monotone" dataKey="critical" stackId="1" stroke="#8B0000" fill="#8B0000" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
