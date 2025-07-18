import "./topBox.scss";
import { topDealUsers } from "../../data.ts";

const TopBox = () => {
  const getTooltip = (amount: number) => {
    if (amount >= 12) return "Critical Level Alert!";
    if (amount >= 8) return "High Level Alert!";
    if (amount >= 3) return "Medium Level Alert!";
    return "Low Level Alert.";
  };

  const getDotColor = (amount: number) => {
    if (amount >= 12) return "#8b0000";  // Critical
    if (amount >= 8) return "#ff0000";   // High
    if (amount >= 3) return "#ff9900";   // Medium
    return "#eee900";                    // Low
  };

  return (
    <div className="topBox">
      <h1>Recent Alerts</h1>
      <div className="list">
        {topDealUsers.map(user => {
          const amount = parseInt(user.amount);
          return (
            <div className="listItem" key={user.id}>
              <div className="user">
                <div
                  className="dot"
                  style={{ backgroundColor: getDotColor(amount) }}
                ></div>
                <div className="userTexts">
                  <span className="username">{user.username}</span>
                  <span className="email">{user.email}</span>
                </div>
              </div>
              <span
                className="amount"
                title={getTooltip(amount)}
              >
                {user.amount}
              </span>
            </div>
          );
        })}
      </div>
      <div className="viewAll">
        <a href="/alerts">View all</a>
      </div>
    </div>
  );
};

export default TopBox;
