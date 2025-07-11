import "./topBox.scss"
import { topDealUsers } from "../../data.ts"

const TopBox = () => {
  const getTooltip = (amount: number) => {
    if (amount >= 12) return "Critical Level Alert!";
    if (amount >= 8) return "High Level Alert!";
    if (amount >= 3) return "Medium Level Alert!";
    return "Low Level Alert.";
  };

  return (
    <div className="topBox">
      <h1>Recent Alerts</h1>
      <div className="list">
        {topDealUsers.map(user => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span
              className="amount"
              title={getTooltip(parseInt(user.amount))}
            >
              {user.amount}
            </span>
          </div>
        ))}
      </div>
      <div className="viewAll">
        <a href="/alerts">View all</a>
      </div>
    </div>
  );
};

export default TopBox;
