import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./barChartBox.scss";

type ChartItem = {
  name: string;
  type: string;
  anomaly: number;
  [key: string]: string | number;
};

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: ChartItem[];
};

const BarChartBox = (props: Props) => {
  const [filter, setFilter] = useState("Logon");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredData = props.chartData.filter((item) => item.type === filter);
  const hasData = filteredData.some((item) => (item[props.dataKey] as number) > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0].value > 0) {
        const day = payload[0].payload.name; // Correct day label
        const value = payload[0].value;

        return (
        <div
            style={{
            backgroundColor: "#2a3447",
            borderRadius: "5px",
            padding: "5px 10px",
            color: "#ff9800",
            }}
        >
            {day}: {value}
        </div>
        );
    }
    return null;
    };


  return (
    <div className="barChartBox">
      <div className="barChartHeader">
        <h1>{props.title}</h1>
        <div className="dropdown">
          <label htmlFor="filter">Show: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="Logon">Logon Only</option>
            <option value="General">General Only</option>
            <option value="Process">Process Behavior</option>
          </select>
        </div>
      </div>

      <div className="chart">
        {hasData ? (
          <ResponsiveContainer width="99%" height={150}>
            <BarChart data={filteredData} margin={{ bottom: 20 }}>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "none" }} />
              <Bar dataKey={props.dataKey} fill={props.color} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="noChartFallback">
            <div className="noData">No Anomalies Detected</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChartBox;
