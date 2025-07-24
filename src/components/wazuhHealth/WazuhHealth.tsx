import "./wazuhHealth.scss";
import { wazuhStatus } from "../../data"; // adjust path if needed

const WazuhHealthBox = () => {
  const { isRunning, version } = wazuhStatus;

  return (
    <div className="wazuhHealthBox">
      <h3>Wazuh Server Health</h3>
      <div className={`statusBox ${isRunning ? "running" : "unreachable"}`}>
        <div className="icon">{isRunning ? "✅" : "❌"}</div>
        <div className="text">
          <p className="status">{isRunning ? "Wazuh is running" : "Wazuh is unreachable"}</p>
          <p className="version">Version: {isRunning ? version : "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default WazuhHealthBox;
