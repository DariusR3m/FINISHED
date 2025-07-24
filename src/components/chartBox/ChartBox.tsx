import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type ChartItem = {
  name: string;
  [key: string]: string | number;
};

type Props = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  chartData: ChartItem[];
};

const ChartBox = (props: Props) => {
  // Calculate total
  const total = props.chartData.reduce((acc, item) => {
    return acc + (item[props.dataKey] as number);
  }, 0);

  const first = props.chartData[0][props.dataKey] as number;
  const last = props.chartData[props.chartData.length - 1][props.dataKey] as number;
  const percentage = first === 0 ? 0 : Math.round(((last - first) / first) * 100);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{total}</h1>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: percentage < 0 ? "tomato" : "limegreen" }}
          >
            {percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
